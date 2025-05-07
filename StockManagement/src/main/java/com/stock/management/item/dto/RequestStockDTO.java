package com.stock.management.item.dto;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class RequestStockDTO {
	
	private int no;
	private int itemId;
	private String itemCode;
	private String type;
	private String itemName;
	private String drawingNo;
	private int basicQuantity;
	private String location;
	private int approval;
	private LocalDateTime insertDate;
	
	private String requesterId;
	private String requesterDept;
	private String requesterName;
	
	private String groupId;
}
