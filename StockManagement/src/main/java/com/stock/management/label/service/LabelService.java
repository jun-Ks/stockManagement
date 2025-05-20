package com.stock.management.label.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.stock.management.label.dto.LabelInfoDTO;
import com.stock.management.label.mapper.ILabelMapper;

@Service
public class LabelService implements ILabelService{
    
    @Autowired
    ILabelMapper mapper;

    //모든 라벨위치정보
    @Override
    public List<LabelInfoDTO> getLabelInfo() {
        List<LabelInfoDTO> labelInfoList = mapper.getLabelInfo();
        return labelInfoList;
    }

    //rackname 으로 라벨위치정보가져오기
    @Override
    public List<LabelInfoDTO> getLabelInfoByRackName(String rackName) {
        List<LabelInfoDTO> labelInfoList = mapper.getLabelInfoByRackName(rackName);
        return labelInfoList;
    }

    //rackname 가져오기
    @Override
    public List<String> getRackName() {
        List<String> rackNameList = mapper.getRackName();
        return rackNameList;
    }

    //rackNumber가져오기
    @Override
    public List<String> getRackNumberByName(String rackName) {
        List<String> rackNumberList = mapper.getRackNumberByName(rackName);
        return rackNumberList;
    }

    //rackStage가져오기
    @Override
    public List<String> getRackStageByNameNumber(String rackName, String rackStage) {
        List<String> rackStageList = mapper.getRackStageByNameNumber(rackName, rackStage);
        return rackStageList;
    }

    //fullName가져오기 by name, number
    @Override
    public List<String> getFullNameByNameNumber(String rackName, String rackNumber) {
        List<String> fullNameList = mapper.getFullNameByNameNumber(rackName, rackNumber);
        return fullNameList;
    }

    @Override
    public List<String> getFullNameByName(String rackName) {
        List<String> fullNameList = mapper.getFullNameByName(rackName);
        return fullNameList;
    }
}
