package com.stock.management.label;


import java.util.ArrayList;
import java.util.Base64;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.imageio.ImageIO;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.EncodeHintType;
import com.google.zxing.MultiFormatWriter;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;

public class QrCodeMaker {
    
    public static List<String> makeQRCodes(List<String> locations, int width, int height){
        Map<EncodeHintType, Object> hints = new HashMap<>();
        hints.put(EncodeHintType.CHARACTER_SET, "UTF-8");
        List<String> qrCodes = new ArrayList<>();

        for(String location : locations){

            try {
                BitMatrix matrix = new MultiFormatWriter().encode(
                    location, BarcodeFormat.QR_CODE, width, height, hints
                    );
                    
                    BufferedImage image = MatrixToImageWriter.toBufferedImage(matrix);
                    
                    ByteArrayOutputStream baos = new ByteArrayOutputStream();
                    
                    ImageIO.write(image, "png", baos);
                    
                    byte[] imageBytes = baos.toByteArray();
                    
                    String base64Image =  Base64.getEncoder().encodeToString(imageBytes);
                    qrCodes.add(base64Image);

                } catch (WriterException e) {
                    qrCodes.add(null);
                } catch (IOException e) {
                    qrCodes.add(null);
                }
            }
        return qrCodes;
    }
}
