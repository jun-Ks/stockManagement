package com.stock.management.label.dto;
import java.util.List;
import lombok.Data;

@Data
public class QRResultDTO {
    
    private List<String> locations;
    private List<String> qrInfo;
}
