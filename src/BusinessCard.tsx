import { motion } from "framer-motion";
import { Mail, Linkedin, BriefcaseBusiness } from "lucide-react";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-xl shadow-md border bg-white/10 backdrop-blur-xl ${className}`}
    >
      {children}
    </div>
  );
}
export function CardContent({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`p-4 ${className}`}>{children}</div>;
}
function InfoRow({
  icon,
  text,
  href,
}: {
  icon: React.ReactNode;
  text: string;
  href: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
    >
      {icon}
      <span className="text-white text-sm break-all">{text}</span>
    </a>
  );
}

const BusinessCard = () => {
  const [searchParams] = useSearchParams();

  const fullName = searchParams.get("fullName");
  const designation = searchParams.get("designation");
  const email = searchParams.get("email");
  const website = searchParams.get("website");
  const linkedin = searchParams.get("linkedin");
  useEffect(() => {
    console.log(fullName);
  }, [fullName]);
  const user = {
    fullName: fullName,
    designation: designation,
    email: email || "",
    website: website || "",
    linkedin: linkedin || "",
    profilePhoto:
      "https://media2.dev.to/dynamic/image/width=800%2Cheight=%2Cfit=scale-down%2Cgravity=auto%2Cformat=auto/https%3A%2F%2Fwww.gravatar.com%2Favatar%2F2c7d99fe281ecd3bcd65ab915bac6dd5%3Fs%3D250",
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <Card className="w-[340px] sm:w-[400px] bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden">
          <CardContent className="p-6">
            <div className="flex flex-col items-center">
              <img
                src={user.profilePhoto}
                alt="Profile"
                className="w-24 h-24 rounded-full border-4 border-white shadow-lg mb-4 object-cover"
              />
              <h2 className="text-2xl font-bold text-white tracking-tight">
                {user.fullName}
              </h2>
              <p className="text-sm text-gray-300 mt-1">{user.designation}</p>
            </div>
            <div className="mt-6 space-y-4">
              <InfoRow
                icon={<Mail className="h-5 w-5 text-white" />}
                text={user.email}
                href={`mailto:${user.email}`}
              />
              <InfoRow
                icon={<BriefcaseBusiness className="h-5 w-5 text-white" />}
                text={user.website}
                href={user.website}
              />
              <InfoRow
                icon={<Linkedin className="h-5 w-5 text-white" />}
                text={user.linkedin}
                href={user.linkedin}
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default BusinessCard;
