package com.stock.management.item.dto;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class RequestModiLocationDTO {
	private int no;
	private int itemId;
	private String itemCode;
	private String drawingNo;
	private String type;
	private String itemName;
	private String location;
	private String modiLocation;
	private int quantity;
	private int modiQuantity;
	private LocalDateTime insertDate;
	private String note;
	private int approval;
	
	private String requesterId;
	private String requesterDept;
	private String requesterName;
	
	private String groupId;
}
