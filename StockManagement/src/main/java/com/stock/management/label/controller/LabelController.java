package com.stock.management.label.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.stock.management.label.QrCodeMaker;
import com.stock.management.label.dto.LabelInfoDTO;
import com.stock.management.label.dto.QRResultDTO;
import com.stock.management.label.service.ILabelService;

@RestController
public class LabelController {
    
    @Autowired
    private ILabelService service;

    //rackName가져오기
    @GetMapping("/label/location/rackName")
    public ResponseEntity<List<String>> getRackName(){

        List<String> rackNameList = service.getRackName();

        return ResponseEntity.ok(rackNameList);
    }

    //rackNumber가져오기
    @GetMapping("/label/location/{rackName}/rackNumber")
    public ResponseEntity<List<String>> getRackNumber(@PathVariable("rackName") String rackName){
        List<String> rackNumberList = service.getRackNumberByName(rackName);
        //System.out.println(rackNumberList.toString());
        return ResponseEntity.ok(rackNumberList);
    }

    //rackStage가져오기
    @GetMapping("/label/location/{rackName}/{rackNumber}/rackStage")
    public ResponseEntity<List<String>> getRackStage(@PathVariable("rackName") String rackName, @PathVariable("rackNumber") String rackNumber){
        List<String> rackStageList = service.getRackStageByNameNumber(rackName, rackNumber);
  
        return ResponseEntity.ok(rackStageList);
    }

    //qr생성하기
    @PostMapping("/label/qr")
    public ResponseEntity<List<QRResultDTO>> makeQrCode(@RequestBody LabelInfoDTO locationData){
        String loca_rackName = locationData.getRackName();
        String loca_rackNumber = locationData.getRackNumber();
        String loca_rackStage = locationData.getRackStage();
        
        //location, qr정보가 담길 배열
        List<QRResultDTO> finalList = new ArrayList<>();

        //rackNumber != none, rackStage = none
        if(!loca_rackNumber.equals("NONE") && loca_rackStage.equals("NONE")){
            //rackName, racknumber로 정보가져오기
            List<String> fullNameList = service.getFullNameByNameNumber(locationData.getRackName(), locationData.getRackNumber());
            //System.out.println("rackNumber!=null: " + fullNameList.toString());

            List<String> qrCodes = QrCodeMaker.makeQRCodes(fullNameList, 150, 150);

            QRResultDTO result = new QRResultDTO();
            result.setLocations(fullNameList);
            result.setQrInfo(qrCodes);

            finalList.add(result);

             //System.out.println(finalList.toString());
            //rackNumber = none, rackStage = none
        }else if(loca_rackNumber.equals("NONE") && loca_rackStage.equals("NONE")){
            //rackName으로 정보가져오기
            List<String> fullNameList = service.getFullNameByName(locationData.getRackName());
            //System.out.println("rackNumber/stage == null : " + fullNameList.toString());

            List<String> qrCodes = QrCodeMaker.makeQRCodes(fullNameList, 150, 150);

            QRResultDTO result = new QRResultDTO();
            result.setLocations(fullNameList);
            result.setQrInfo(qrCodes);

            finalList.add(result);

            //System.out.println(finalList.toString());
            //rackNumber != none, rackStage != none
        }else if (!loca_rackNumber.equals("NONE") && !loca_rackStage.equals("NONE")){
            List<String> fullName = new ArrayList<>();
            fullName.add(loca_rackName + "-" + loca_rackNumber + "-" + loca_rackStage);
            
            List<String> qrCodes = QrCodeMaker.makeQRCodes(fullName, 150, 150);

            QRResultDTO result = new QRResultDTO();
            result.setLocations(fullName);
            result.setQrInfo(qrCodes);

            finalList.add(result);

            //System.out.println(finalList.toString());
        }

        return ResponseEntity.ok(finalList);
    }
}
