import { Box } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import { Html5QrcodeScanner, Html5QrcodeSupportedFormats } from "html5-qrcode";
import ProductPopover from "./ProductPreviewCard";
import './customScannerStyles.css';

const ScanPage = () => {
  const [foundProduct, setFoundProduct] = useState<string | undefined>(undefined);
  const qrScannerRef = useRef<Html5QrcodeScanner | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const handleScanSuccess = (decodedText: string) => {
    setFoundProduct(decodedText);
  };

  const handleClose = () => {
    setFoundProduct(undefined);
  };

  useEffect(() => {
    if (!qrScannerRef.current) { // چک کردن اینکه اسکنر قبلاً ساخته نشده باشد
      qrScannerRef.current = new Html5QrcodeScanner(
        "reader", 
        { 
          fps: 10, 
          qrbox: { width: 250, height: 250 },
          formatsToSupport: [
            Html5QrcodeSupportedFormats.QR_CODE,
            Html5QrcodeSupportedFormats.EAN_13,
            Html5QrcodeSupportedFormats.UPC_A,
            Html5QrcodeSupportedFormats.CODE_128,
          ],
          showZoomSliderIfSupported: true,
          disableFlip: false
        },
        false
      );

      qrScannerRef.current.render(handleScanSuccess, () => {});

      // ست کردن اتوماتیک کلیک روی دکمه‌ی درخواست دسترسی به دوربین
      const cameraPermissionButton = document.getElementById("html5-qrcode-button-camera-permission");
      if (cameraPermissionButton) {
        cameraPermissionButton.click();
      }
    }

    return () => {
      if (qrScannerRef.current) {
        qrScannerRef.current.clear();
        qrScannerRef.current = null; // پاک کردن رفرنس به اسکنر
      }
    };
  }, []);

  return (
    <Box className="w-full h-full bg-black" sx={{ position: "relative" }}>
      <div id="reader" style={{ width: "100%", height: "100%" }} />
      {foundProduct && (
        <ProductPopover
          anchorEl={bottomRef.current}
          handleClose={handleClose}
          productName={foundProduct}
        />
      )}
      <div ref={bottomRef} style={{ position: 'absolute', bottom: 130, left: '50%', transform: 'translateX(-50%)' }} />
    </Box>
  );
};

export default ScanPage;
