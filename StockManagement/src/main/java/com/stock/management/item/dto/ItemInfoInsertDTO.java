package com.stock.management.item.dto;



import lombok.Data;

@Data
public class ItemInfoInsertDTO {

	private ItemInfoDTO insertData;
	private String userId;
	private String userName;
	private String userDept;
}
