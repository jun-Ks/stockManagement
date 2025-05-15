package com.stock.management.item.controller;

import java.io.IOException;
import java.net.URLEncoder;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.CreationHelper;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import com.stock.management.item.dto.DeliveryListDTO;
import com.stock.management.item.dto.DeliveryLogDTO;
import com.stock.management.item.dto.ItemInfoDTO;
import com.stock.management.item.service.IItemService;

import jakarta.servlet.http.HttpServletResponse;


@RestController
public class ExcelController {
	
	@Autowired
	IItemService itemService;
	
	//출고리스트 엑셀 전환
	@PostMapping("/delivery-list/excel/{startDate}/{endDate}/{userId}/{status}")
	public void deliveryListByExcel(
			@PathVariable("startDate") String startDate, 
			@PathVariable("endDate") String endDate,
			@PathVariable("userId") String userId,
			@PathVariable("status") int status,
			HttpServletResponse response
			) throws IOException {
		
		LocalDateTime now = LocalDateTime.now();
		String dateStr = now.format(DateTimeFormatter.ofPattern("yyyyMMdd_HHmmss"));
		
		if(status == 0) {
			//본인 것만 변환
			String fileName = startDate + "~" + endDate + "_출고조회리스트(" + userId + ")_" + dateStr;
			//로그정보불러오기
 			List<DeliveryLogDTO> logListBySelf = itemService.getDeliveryLogByDate(startDate, endDate, userId);
 			makeExcel(logListBySelf, response, fileName);
 			
 		}else {
 			//전체 리스트 변환
 			String fileName = startDate + "~" + endDate + "_출고조회리스트(전체)_" + dateStr;
 			List<DeliveryLogDTO> allLogList = itemService.getAllDeliveryLog(startDate, endDate);
 			makeExcel(allLogList, response, fileName);
 		}
		
	}
	
	public void makeExcel(List<DeliveryLogDTO> logList, HttpServletResponse response, String fileName) throws IOException {
		//엑셀 워크북(파일) 생성
		Workbook workbook = new XSSFWorkbook();
		
		//시트생성
		Sheet sheet = workbook.createSheet("출고리스트");
		
		//헤더(첫번째 행) 생성
		Row header = sheet.createRow(0);
		header.createCell(0).setCellValue("제품ID");
		header.createCell(1).setCellValue("품목코드");
		header.createCell(2).setCellValue("도면번호");
		header.createCell(3).setCellValue("품목명");
		header.createCell(4).setCellValue("위치");
		header.createCell(5).setCellValue("출고수량");
		header.createCell(6).setCellValue("출고자ID");
		header.createCell(7).setCellValue("출고자 부서");
		header.createCell(8).setCellValue("출고자 성명");
		header.createCell(9).setCellValue("출고일자");
		
		//제품 정보리스트 담기
		List<ItemInfoDTO> itemInfoList = new ArrayList<>();
		
		for (int i = 0; i < logList.size(); i++) {
		   int itemId = logList.get(i).getItemId();
		   itemInfoList.addAll(itemService.getItemById(itemId));
		}
		
		DeliveryListDTO list = new DeliveryListDTO();
		list.setItemInfoList(itemInfoList);
		list.setLogList(logList);
		
		//엑셀데이터
		//날짜데이터 소수로안나오게
		CellStyle dateCellStyle = workbook.createCellStyle();
		CreationHelper createHelper = workbook.getCreationHelper();
		dateCellStyle.setDataFormat(createHelper.createDataFormat().getFormat("yyyy-MM-dd HH:mm:ss"));
		
		for(int i = 0; i < list.getItemInfoList().size(); i++) {
			Row row = sheet.createRow(i + 1); //0은 헤더라서 1부터 시작
			//첫째열데이터 삽입
			row.createCell(0).setCellValue(list.getItemInfoList().get(i).getNo()); //제품id
			row.createCell(1).setCellValue(list.getItemInfoList().get(i).getItemCode()); //품목코드
			row.createCell(2).setCellValue(list.getItemInfoList().get(i).getDrawingNo()); //도면번호
			row.createCell(3).setCellValue(list.getItemInfoList().get(i).getItemName());//품목명
			row.createCell(4).setCellValue(list.getItemInfoList().get(i).getLocation());//위치
			
			row.createCell(5).setCellValue(list.getLogList().get(i).getCartQty());//출고수량
			row.createCell(6).setCellValue(list.getLogList().get(i).getUserId());//출고자 id
			row.createCell(7).setCellValue(list.getLogList().get(i).getUserDept());//출고자 부서
			row.createCell(8).setCellValue(list.getLogList().get(i).getUserName());//출고자 성명
			//날짝데이터 가공
			LocalDateTime deliveryDate = list.getLogList().get(i).getDeliveryDate();
			Cell cell = row.createCell(9);
			cell.setCellValue(deliveryDate);
			cell.setCellStyle(dateCellStyle);
			
		}
		
		//셀넓이 늘리기
		sheet.setColumnWidth(0, 10 * 256); //제품id
		sheet.setColumnWidth(1, 25 * 256); //품목코드
		sheet.setColumnWidth(2, 25 * 256); //도면번호
		sheet.setColumnWidth(3, 25 * 256); //품목명
		sheet.setColumnWidth(4, 10 * 256); //위치
		sheet.setColumnWidth(5, 10 * 256); //출고수량
		sheet.setColumnWidth(6, 10 * 256); //출고자 id
		sheet.setColumnWidth(7, 10 * 256); //출고자 부서
		sheet.setColumnWidth(8, 10 * 256); //출고자 성명
		sheet.setColumnWidth(9, 25 * 256); //출고일자

		// 응답 설정
		String encodedFileName = URLEncoder.encode(fileName, "UTF-8").replaceAll("\\+", "%20");
	    response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
	    response.setHeader("Content-Disposition", "attachment; filename=" + encodedFileName + ".xlsx");

	    workbook.write(response.getOutputStream());
	    workbook.close();
	    
	}
}
