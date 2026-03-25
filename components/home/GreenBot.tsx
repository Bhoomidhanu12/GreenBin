import { useEffect } from "react";

declare global {
  interface Window {
    botpressWebChat?: {
      init: (config: any) => void;
    };
    botpressInitialized?: boolean;
  }
}

const GreenBot = () => {
  useEffect(() => {
    // Prevent multiple loads
    if (window.botpressInitialized) return;

    const script = document.createElement("script");
    script.src = "https://cdn.botpress.cloud/webchat/v2.2/inject.js";
    script.async = true;

    script.onload = () => {
      if (window.botpressWebChat) {
        window.botpressWebChat.init({
          clientId: "652YHNWW", // ✅ Bot ID

          hostUrl: "https://cdn.botpress.cloud/webchat/v2.2",
          messagingUrl: "https://messaging.botpress.cloud",

          container: "#bp-web-widget", // render inside div
          hideWidget: true,            // disable default bubble

          layoutWidth: "100%",
          containerWidth: "100%",
        });
      }
    };

    document.body.appendChild(script);
    window.botpressInitialized = true;
  }, []);

  return (
    <div
      id="bp-web-widget"
      className="w-full h-full"
      style={{
        minHeight: "450px",
        backgroundColor: "#f8f9ff",
      }}
    />
  );
};

export default GreenBot;

