import { Box, Theme, Typography, useMediaQuery } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import AsmCard from "../../components/Home/AsmCard";
import ClassCard from "../../components/Home/ClassCard";
import NavAddBtn from "../../components/Main/Navigation/NavAddBtn";
import { mockedData } from "../../mocked/mockedData";

interface Comment {
  comment_author_id: String;
  content: String;
  created: String; //Date,
}

interface getAllAssignmentsResponse {
  class_code: String;
  class_name: String;
  assignment_name: String;
  assignment_description: String;
  turnin_late: Boolean;
  score: Number;
  assignment_optional_file: string[];
  comment: Comment[];
  assignment_start_date: String; //Date,
  assignment_end_date: String; //Date,
  created: String; //Date,
  status: String;
}

const HomeAssignments: FC = () => {
  const isDesktop = useMediaQuery((theme: Theme) => theme.breakpoints.up("sm"));
  const [content, setContent] = useState<getAllAssignmentsResponse[]>([]);

  const fetchGetAllAsm = async () => {
    setContent(mockedData.mockedAllAssignments);
  };

  useEffect(() => {
    fetchGetAllAsm();
  }, []);

  return (
    <>
      <Box width="100%" maxWidth="1060px">
        <Box
          paddingY={{ xs: 2, sm: 3 }}
          display="flex"
          justifyContent="space-between"
        >
          <Typography variant="h2">งานมอบหมาย</Typography>
        </Box>
        <Box>
          {content.map((item: getAllAssignmentsResponse) => (
              <AsmCard item={item} />
          ))}
        </Box>
      </Box>
    </>
  );
};

export default HomeAssignments;
