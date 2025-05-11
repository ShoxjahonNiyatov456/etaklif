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
    console.log(
      `Generating OG image for invitation: ${uniqueId}, type: ${type}, template: ${templateId}`
    );

    let invitationData = null;
    let rawData = null;

    try {
      rawData = await getInvitationByUniqueId(uniqueId);
      console.log(
        "Raw data received:",
        JSON.stringify(rawData).substring(0, 200) + "..."
      );

      invitationData = rawData?.invitationData || rawData || {};
      console.log(
        "Parsed invitation data:",
        JSON.stringify(invitationData).substring(0, 200) + "..."
      );
    } catch (fetchError) {
      console.error("Error fetching invitation data:", fetchError);
      invitationData = {};
    }

    const location =
      invitationData?.location || rawData?.location || "Manzil ko'rsatilmagan";
    const time = invitationData?.time || rawData?.time || "Vaqt ko'rsatilmagan";
    const firstName =
      invitationData?.firstName || rawData?.firstName || "Ism ko'rsatilmagan";
    const secondName = invitationData?.secondName || rawData?.secondName || "";
    const age = invitationData?.age || rawData?.age || "";
    const date = invitationData?.date || rawData?.date || "Sana ko'rsatilmagan";
    const uploadedImage =
      invitationData?.uploadedImage || rawData?.uploadedImage || null;
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
          {/* Background image */}
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

          {/* Dark overlay to ensure text readability */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0, 0, 0, 0.5)",
            }}
          />

          {/* Content overlay */}
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
            {/* Taklifnoma sarlavhasi */}
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

            {/* Qo'shimcha ma'lumot (ismlar) */}
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

            {/* Taklifnoma ma'lumotlari */}
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

              {/* Manzil */}
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
