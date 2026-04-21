import { motion } from "framer-motion";
import React, { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { api } from "./api/axios";
import FooterSecurityBanner from "./components/payment/FooterSecurityBanner";
import JourneySummary from "./components/payment/JourneySummary";
import PaymentMethods from "./components/payment/PaymentMethods";
import { useToast } from "./context/ToastContext";

const Payment: React.FC = () => {
  const location = useLocation();
  const bookingData = location.state;
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

  if (!bookingData) {
    return <Navigate to="/" replace />;
  }

  const handlePayment = async () => {
    setIsProcessing(true);
    addToast("Initializing secure payment gateway...", "info");

    try {
      const {
        train,
        selectedClass,
        passengers,
        contactEmail,
        contactPhone,
        fareBreakdown,
      } = bookingData;

      // 1. Create order
      const orderRes = await api.post("/payment/create-order", {
        amount: fareBreakdown.totalAmount,
      });

      const orderData = orderRes.data?.response?.data || orderRes.data?.data;
      if (!orderData?.id) {
        throw new Error("Failed to create payment order: Missing Order ID");
      }

      // 2. Initialize Razorpay
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || "rzp_test_placeholder",
        amount: orderData.amount,
        currency: orderData.currency || "INR",
        name: "RailExpress",
        description: `Ticket Booking - ${train?.trainName || ""}`,
        order_id: orderData.id,
        handler: async (response: any) => {
          try {
            addToast("Payment complete. Verifying transaction...", "info");

            // 3. Verify Payment
            const verifyRes = await api.post("/payment/verify", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            if (
              verifyRes.data?.response?.data?.verified ||
              verifyRes.data?.data?.verified ||
              verifyRes.status === 200
            ) {
              // 4. Create Booking
              const payload = {
                train: train._id,
                className: selectedClass.className,
                passengers: passengers.map((p: any) => ({
                  fullName: p.name,
                  age: parseInt(p.age),
                  gender: p.gender,
                  berthPreference: p.berth || undefined,
                })),
                contactEmail,
                contactPhone,
                fareBreakdown: {
                  baseFare: fareBreakdown.baseFare,
                  superfastCharge: fareBreakdown.superfastCharge,
                  reservationCharge: fareBreakdown.reservationCharge,
                  insurance: fareBreakdown.insurance,
                  gst: fareBreakdown.gst,
                  totalAmount: fareBreakdown.totalAmount,
                },
              };

              const bookingRes = await api.post("/bookings", payload);

              if (
                bookingRes.data?.success ||
                bookingRes.status === 200 ||
                bookingRes.status === 201
              ) {
                addToast(
                  "Payment verified! Ticket booked successfully.",
                  "success",
                );
                navigate("/booking-confirmation", {
                  state: {
                    bookingResponse:
                      bookingRes.data.data ||
                      bookingRes.data.response?.data ||
                      bookingRes.data,
                    train,
                    selectedClass,
                  },
                });
              } else {
                addToast(
                  "Booking capture failed after payment. Processing refund...",
                  "error",
                );
              }
            } else {
              addToast("Payment verification failed!", "error");
            }
          } catch (error) {
            console.error("Verification/Booking error:", error);
            addToast(
              "An error occurred during verification. Please contact support.",
              "error",
            );
          } finally {
            setIsProcessing(false);
          }
        },
        prefill: {
          name:
            passengers && passengers.length > 0
              ? passengers[0].name
              : "Passenger",
          email: contactEmail,
          contact: contactPhone,
        },
        theme: {
          color: "#3463ef",
        },
        modal: {
          ondismiss: function () {
            setIsProcessing(false);
            addToast("Payment cancelled by user.", "info");
          },
        },
      };

      const rzp1 = new (window as any).Razorpay(options);
      rzp1.on("payment.failed", function (response: any) {
        setIsProcessing(false);
        addToast(
          `Payment failed: ${response.error?.description || "Unknown error"}`,
          "error",
        );
      });
      rzp1.open();
    } catch (error: any) {
      console.error("Payment initialization error:", error);
      const errMsg =
        error.response?.data?.message ||
        error.message ||
        "Payment gateway initialization failed.";
      addToast(`Payment failed: ${errMsg}`, "error");
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen font-display">
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .pay-glow {
            box-shadow: 0 0 20px rgba(13, 108, 242, 0.4);
        }
        .step-active::after {
            content: '';
            position: absolute;
            bottom: -2px;
            left: 0;
            width: 100%;
            height: 2px;
            background-color: #0d6cf2;
        }
      `,
        }}
      />

      <motion.main
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.15,
              delayChildren: 0.1,
            },
          },
        }}
        className="max-w-7xl mx-auto px-4 py-8"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <PaymentMethods isProcessing={isProcessing} />
          <JourneySummary
            bookingData={bookingData}
            onPay={handlePayment}
            isProcessing={isProcessing}
          />
        </div>
      </motion.main>

      <FooterSecurityBanner />
    </div>
  );
};

export default Payment;
