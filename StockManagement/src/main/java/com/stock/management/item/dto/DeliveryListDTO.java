package com.stock.management.item.dto;

import java.util.List;

import lombok.Data;

@Data
public class DeliveryListDTO {
	
    private List<DeliveryLogDTO> logList;
    private List<ItemInfoDTO> itemInfoList;
}
