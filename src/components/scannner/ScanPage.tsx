import { Box } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import { Html5QrcodeScanner, Html5QrcodeSupportedFormats } from "html5-qrcode";
import ProductPopover from "./ProductPreviewCard";
import './customScannerStyles.css';
import { useProductDetails } from "../../api/product/getProductDetail";
import { notif } from "../common/notification/Notification";

const ScanPage = () => {
  const [barcode, setBarcode] = useState<string | undefined>(undefined);
  const qrScannerRef = useRef<Html5QrcodeScanner | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const store_id = localStorage.getItem("storeId");

  const {
    data: productDetails,
    isLoading,
    isError,
  } = useProductDetails(store_id!, barcode! );

  const handleScanSuccess = (decodedText: string) => {
    setBarcode(decodedText); // پس از اسکن، بارکد را تنظیم کنید
  };

  const handleClose = () => {
    setBarcode(undefined);
  };

  useEffect(()=>{
    if(isError)
      notif("بارکد شناسایی شده معتبر نمی‌باشد.", {variant:"error"})
  },[isError])
  useEffect(() => {
    if (!qrScannerRef.current) {
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

      const cameraPermissionButton = document.getElementById("html5-qrcode-button-camera-permission");
      if (cameraPermissionButton) {
        cameraPermissionButton.click();
      }
    }

    return () => {
      if (qrScannerRef.current) {
        qrScannerRef.current.clear();
        qrScannerRef.current = null;
      }
    };
  }, []);

  return (
    <Box className="w-full h-full bg-black" sx={{ position: "relative" }}>
      <div id="reader" style={{ width: "100%", height: "100%" }} />
      {productDetails && (
        <ProductPopover
          anchorEl={bottomRef.current}
          handleClose={handleClose}
          productName={productDetails.name} // نمایش نام محصول
          productDetails={productDetails} // سایر جزئیات محصول
        />
      )}
      <div ref={bottomRef} style={{ position: 'absolute', bottom: 130, left: '50%', transform: 'translateX(-50%)' }} />
    </Box>
  );
};

export default ScanPage;
