import { Box, Button } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import ProductPopover from "./ProductPreviewCard";

const ScanPage = () => {
  const [foundProduct, setFoundProduct] = useState<string | undefined>(undefined);
  const [scanning, setScanning] = useState(false);
  const qrScannerRef = useRef<Html5QrcodeScanner | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const handleScanSuccess = (decodedText: string) => {
    setFoundProduct(decodedText);
    setScanning(false);
    if (qrScannerRef.current) {
      qrScannerRef.current.clear();
    }
  };

  const handleClick = () => {
    setScanning(true);
  };

  const handleClose = () => {
    setFoundProduct(undefined);
  };

  useEffect(() => {
    if (scanning) {
      qrScannerRef.current = new Html5QrcodeScanner(
        "reader",
        { fps: 10, qrbox: { width: 250, height: 250 } },
        false
      );
      qrScannerRef.current.render(handleScanSuccess , ()=>{});
    }

    return () => {
      if (qrScannerRef.current) {
        qrScannerRef.current.clear();
      }
    };
  }, [scanning]);

  return (
    <Box className="w-full h-full" sx={{ position: "relative" }}>
      <Button onClick={handleClick}>اسکن</Button>
      {scanning && <div id="reader" style={{ width: "100%", height: "100%" }} />}
      {foundProduct && (
        <ProductPopover
          anchorEl={bottomRef.current}
          handleClose={handleClose}
          productName={foundProduct}
        />
      )}
      <div ref={bottomRef} style={{ position: 'absolute', bottom: 100, left: '50%', transform: 'translateX(-50%)' }} />
    </Box>
  );
};

export default ScanPage;
