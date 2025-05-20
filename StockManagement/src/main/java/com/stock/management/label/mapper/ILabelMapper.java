package com.stock.management.label.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.stock.management.label.dto.LabelInfoDTO;

@Mapper
public interface ILabelMapper {

    //모든 라벨정보가져오기
    public List<LabelInfoDTO> getLabelInfo();
    
    //rackname으로 정보가져오기
    public List<LabelInfoDTO> getLabelInfoByRackName(@Param("rackName") String rackName);
    
    //rackName만 가져오기
    public List<String> getRackName();
    
    //racknumber 가져오기
    public List<String> getRackNumberByName(@Param("rackName") String rackName);

    //rackStage 가져오기
    public List<String> getRackStageByNameNumber(@Param("rackName") String rackName, @Param("rackNumber") String rackStage);

    //rackName, rackNumber로 fullName가져오기
    public List<String> getFullNameByNameNumber(@Param("rackName") String rackName, @Param("rackNumber") String rackNumber);
   
    //rackName으로 fullName가져오기
    public List<String> getFullNameByName(@Param("rackName") String rackName);
   
}
