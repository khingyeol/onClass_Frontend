import { Box, Theme, Typography, useMediaQuery } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import AsmCard from "../../components/Home/AsmCard";
import ClassCard from "../../components/Home/ClassCard";
import NavAddBtn from "../../components/Main/Navigation/NavAddBtn";
import { mockedData } from "../../mocked/mockedData";
import { getTodo } from "../../services/class/api_class";

interface Comment {
  comment_author_id: string;
  content: string;
  created: string; //Date,
}

interface getAllAssignmentsResponse {
  class_code: string;
  class_name: string;
  assignment_name: string;
  assignment_description: string;
  turnin_late: boolean;
  score: Number;
  assignment_optional_file: string[];
  comment: Comment[];
  assignment_start_date: string; //Date,
  assignment_end_date: string; //Date,
  created: string; //Date,
  status: string;
}

const HomeAssignments: FC = () => {
  const isDesktop = useMediaQuery((theme: Theme) => theme.breakpoints.up("sm"));
  const [content, setContent] = useState<getAllAssignmentsResponse[]>([]);

  const fetchGetAllAsm = async () => {
    // getNoti?
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
            <AsmCard
              title={item.assignment_name}
              desc={item.class_name}
              midText={item.assignment_end_date}
              trailText={item.status}
            />
          ))}
        </Box>
      </Box>
    </>
  );
};

export default HomeAssignments;
