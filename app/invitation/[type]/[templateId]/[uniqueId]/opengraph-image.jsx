import { ImageResponse } from "next/og";
import { getInvitationByUniqueId } from "@/app/services/share";

export const runtime = "edge";
export const alt = "Taklifnoma";
export const contentType = "image/png";
export const size = {
  width: 1200,
  height: 630,
};
export const route =
  "/invitation/[type]/[templateId]/[uniqueId]/opengraph-image.png";

const DEFAULT_IMAGES = {
  wedding:
    "https://res.cloudinary.com/ds7uywpld/image/upload/v1744642148/invitations/av26tkcvws1d50tqfclc.webp",
  birthday:
    "https://res.cloudinary.com/ds7uywpld/image/upload/v1743767337/invitations/dckjuhjwvbcmtqz2ceqj.jpg",
  funeral:
    "https://res.cloudinary.com/ds7uywpld/image/upload/v1744628821/invitations/rbafrj2m2fdqiavxqcnr.jpg",
  jubilee:
    "https://res.cloudinary.com/ds7uywpld/image/upload/v1744631369/invitations/yb19akzuhis3jsqrqyxs.jpg",
  engagement:
    "https://res.cloudinary.com/ds7uywpld/image/upload/v1715184490/defaults/engagement-default.jpg",
};

export default async function Image({ params }) {
  try {
    const { uniqueId, type, templateId } = params;
    let invitationData = null;
    let rawData = null;

    let actualInvitationData = {};
    try {
      const rawDbData = await getInvitationByUniqueId(uniqueId);
      actualInvitationData = rawDbData?.invitationData || rawDbData || {};
    } catch (fetchError) {
      console.error("Error fetching invitation data for OG Image:", fetchError);
      actualInvitationData = {}; // Fallback to empty object on error
    }

    const location = actualInvitationData?.location || "Manzil ko'rsatilmagan";
    const time = actualInvitationData?.time || "Vaqt ko'rsatilmagan";
    const firstName = actualInvitationData?.firstName || "Ism ko'rsatilmagan";
    const secondName = actualInvitationData?.secondName || "";
    const age = actualInvitationData?.age || "";
    const date = actualInvitationData?.date || "Sana ko'rsatilmagan";
    const uploadedImage = actualInvitationData?.uploadedImage || null;
    let formattedDate = date;
    try {
      if (date && date.includes("-")) {
        const dateObj = new Date(date);
        if (!isNaN(dateObj.getTime())) {
          const day = dateObj.getDate();
          const months = [
            "Yanvar",
            "Fevral",
            "Mart",
            "Aprel",
            "May",
            "Iyun",
            "Iyul",
            "Avgust",
            "Sentyabr",
            "Oktyabr",
            "Noyabr",
            "Dekabr",
          ];
          const month = months[dateObj.getMonth()];
          formattedDate = `${day} ${month}`;
        }
      }
    } catch (dateError) {
      console.error("Error formatting date:", dateError);
      formattedDate = date;
    }
    let title = "Taklifnoma";
    let subtitle = "";
    switch (type) {
      case "wedding":
        title = "Nikoh to'yi";
        subtitle = `${firstName} va ${secondName}`;
        break;
      case "birthday":
        title = "Tug'ilgan kun";
        subtitle = `${firstName}${age ? ` ${age}-yosh` : ""}`;
        break;
      case "funeral":
        title = "Ma'raka";
        subtitle = `${firstName}`;
        break;
      case "jubilee":
        title = "Yubiley";
        subtitle = `${firstName}${age ? ` ${age}-yillik` : ""}`;
        break;
      case "engagement":
        title = "Unashtiruv";
        subtitle = `${firstName} va ${secondName}`;
        break;
      default:
        title = "Taklifnoma";
        subtitle = firstName ? firstName : "etaklif.vercel.app";
    }

    const backgroundImage =
      uploadedImage || DEFAULT_IMAGES[type] || DEFAULT_IMAGES.wedding;
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "brightness(0.6)",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0, 0, 0, 0.5)",
            }}
          />
          <div
            style={{
              position: "relative",
              zIndex: 1,
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "40px",
              color: "#ffffff",
            }}
          >
            <div
              style={{
                fontSize: 72,
                fontWeight: "bold",
                marginBottom: "1rem",
                textAlign: "center",
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)",
              }}
            >
              {title}
            </div>
            <div
              style={{
                fontSize: 56,
                marginBottom: "2rem",
                textAlign: "center",
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)",
              }}
            >
              {subtitle}
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                background: "rgba(0, 0, 0, 0.6)",
                borderRadius: "16px",
                padding: "24px",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                width: "80%",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "15px" }}
              >
                <div style={{ fontSize: "32px" }}>📅</div>
                <div style={{ fontSize: "32px", fontWeight: "bold" }}>
                  {formattedDate}
                </div>
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "15px" }}
              >
                <div style={{ fontSize: "32px" }}>⏰</div>
                <div style={{ fontSize: "32px", fontWeight: "bold" }}>
                  {time}
                </div>
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "15px" }}
              >
                <div style={{ fontSize: "32px" }}>📍</div>
                <div style={{ fontSize: "32px", fontWeight: "bold" }}>
                  {location}
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        emoji: "twemoji",
      }
    );
  } catch (error) {
    console.error("OpenGraph image generation error:", error);
    return new ImageResponse(
      (
        <div
          style={{
            fontSize: 48,
            background: "linear-gradient(to bottom, #1e3a8a, #3b82f6)",
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            padding: "40px",
            textAlign: "center",
          }}
        >
          <div style={{ marginBottom: "20px" }}>Taklifnoma</div>
          <div
            style={{
              fontSize: 28,
              opacity: 0.8,
              maxWidth: "80%",
            }}
          >
            Batafsil ma'lumot uchun havolani bosing
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  }
}
