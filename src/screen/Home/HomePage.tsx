import { Box, Theme, Typography, useMediaQuery } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import ClassCard from "../../components/Home/ClassCard";
import NavAddBtn from "../../components/Main/Navigation/NavAddBtn";
import { mockedData } from "../../mocked/mockedData";

interface getAllClassResponse {
  class_code: string;
  class_name: string;
  class_section: string;
  teacher: {
    profile_pic: string;
    name: {
      firstname: string;
      lastname: string;
    };
  };
}

const HomePage: FC = () => {
  const isDesktop = useMediaQuery((theme: Theme) => theme.breakpoints.up("sm"));
  const [content, setContent] = useState<getAllClassResponse[]>([]);

  const fetchGetAllClass = async () => {
    setContent(mockedData.mockedAllClass);
    // const res = await getAllClass();
    // console.log(res)
    // if (res.data.result == 'OK') {
    //     setContent(res.data.data)
    //     console.log("eiei",res.data.data)
    // }
    // else {
    //     setContent([])
    // }
  };

  useEffect(() => {
    fetchGetAllClass();
  }, []);

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
          {content.map((item: getAllClassResponse) => (
            <ClassCard key={item.class_code} item={item} />
          ))}
        </Box>
      </Box>
    </>
  );
};

export default HomePage;
