import React, { useState } from "react";
import { motion } from "framer-motion";
import { QRCodeCanvas } from "qrcode.react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Card, CardContent } from "@/components/ui/card";

export const Input = React.forwardRef(
  (
    { className = "", ...props }: React.InputHTMLAttributes<HTMLInputElement>,
    ref: React.Ref<HTMLInputElement>
  ) => {
    return (
      <input
        ref={ref}
        className={`w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition ${className}`}
        {...props}
      />
    );
  }
);

export const Button = ({
  className = "",
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className={`cursor-pointer px-6 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export const Card = ({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => (
  <div className={`bg-white rounded-3xl shadow-lg ${className}`}>
    {children}
  </div>
);

export const CardContent = ({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => <div className={`p-6 ${className}`}>{children}</div>;

export default function EmployeeQRForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    designation: "",
    email: "",
    website: "",
    linkedin: "",
  });
  const [qrVisible, setQrVisible] = useState(false);

  const handleChange = (e: any) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setQrVisible(true);
  };

  const createUrl = () => {
    const query = new URLSearchParams();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) query.append(key, value);
    });
    return `https://qrcode-generat.netlify.app/business-card?${query.toString()}`;
  };

  const qrData = createUrl();

  const downloadQR = () => {
    const canvas = document.getElementById("employeeQR");
    //@ts-ignore
    const pngUrl = canvas
      //@ts-ignore
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    const downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = `${formData.fullName.replace(/\s+/g, "_")}_QR.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-3xl shadow-2xl rounded-2xl">
        <CardContent className="p-8">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-center text-indigo-600 mb-6"
          >
            Employee QR Generator
          </motion.h2>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <Input
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
            <Input
              name="designation"
              placeholder="Designation"
              value={formData.designation}
              onChange={handleChange}
              required
            />
            <Input
              name="email"
              type="email"
              placeholder="Official Email ID"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <Input
              name="website"
              placeholder="Company Website Link"
              value={formData.website}
              onChange={handleChange}
            />
            <Input
              name="linkedin"
              placeholder="LinkedIn Profile"
              value={formData.linkedin}
              onChange={handleChange}
            />
            <div className="md:col-span-2 flex justify-center">
              <Button type="submit" className="mt-2 w-full md:w-1/2">
                Generate QR Code
              </Button>
            </div>
          </form>

          {qrVisible && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mt-8 flex flex-col items-center gap-4"
            >
              <QRCodeCanvas
                id="employeeQR"
                value={qrData}
                size={200}
                bgColor="#FFFFFF"
                fgColor="#000000"
                level="H"
                includeMargin={true}
              />
              <Button onClick={downloadQR}>Download QR Code</Button>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
