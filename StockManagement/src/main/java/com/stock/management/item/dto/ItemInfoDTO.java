package com.stock.management.item.dto;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class ItemInfoDTO {

	private int no;
	private String itemCode;
	private String drawingNo;
	private String detailDrawingNo;
	private String type;
	private String itemName;
	private int basicQuantity;
	private int calculatedQuantity;
	private String location;
	private LocalDateTime insertDate;
	private LocalDateTime modifyDate;
	
	private String groupId;

}
