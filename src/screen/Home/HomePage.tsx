import { Box, Theme, Typography, useMediaQuery } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ClassCard from "../../components/Home/ClassCard";
import NavAddBtn from "../../components/Main/Navigation/NavAddBtn";
import { getAllClass } from "../../services/class/api_class";
import { GetAllClassResponseData } from "../../services/types/getAllClassResponse";
import { getClassId } from "../../store/classsdetail/selector";

const HomePage: FC = () => {
  const isDesktop = useMediaQuery((theme: Theme) => theme.breakpoints.up("sm"));
  const [content, setContent] = useState<GetAllClassResponseData[]>([]);
  // const classid = useSelector(getClassId);
  const { classid } = useParams();

  const fetchGetAllClass = async () => {
    console.log(classid);
    const res = await getAllClass();
    console.log(res);
    if (res.data.result === "OK") {
      setContent(res.data.data);
    } else {
      setContent([]);
    }
  };

  useEffect(() => {
    fetchGetAllClass();
  }, []);

  const classItem = content.map((item: GetAllClassResponseData) => (
    <ClassCard key={item.class_code} item={item} />
  ));

  return (
    <>
      <Box width="100%">
        <Box
          paddingY={{ xs: 2, sm: 3 }}
          display="flex"
          justifyContent="space-between"
        >
          <Typography variant="h2">ชั้นเรียนทั้งหมด</Typography>
          {isDesktop ? null : <NavAddBtn />}
        </Box>
        <Box
          gap={5}
          display={{ xs: "flex", sm: "inline-block" }}
          flexDirection={{ xs: "column" }}
          alignItems={{ xs: "center", sm: "" }}
          flexGrow={1}
        >
          {content.length > 0 ? (
            classItem
          ) : (
            <Typography>ไม่พบชั้นเรียน</Typography>
          )}
        </Box>
      </Box>
    </>
  );
};

export default HomePage;
