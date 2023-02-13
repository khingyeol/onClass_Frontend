import { Box, Theme, Typography, useMediaQuery } from "@mui/material";
import { AxiosError } from "axios";
import React, { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { onClassColorTheme } from "../../common/theme/onClassColorTheme";
import AsmCard from "../../components/Home/AsmCard";
import { getTodo } from "../../services/class/api_class";
import { getAllAssignmentsResponse } from "../../services/types/ClassModel";
import { formatShortDate } from "../../utils/formatDate";

const ClassAssignments: FC = () => {
  const isDesktop = useMediaQuery((theme: Theme) => theme.breakpoints.up("sm"));
  const [content, setContent] = useState<getAllAssignmentsResponse[]>([]);
  const { classid } = useParams();
  const navigate = useNavigate();

  const fetchGetAllAsm = async () => {
    try {
      const res = await getTodo(classid!);
      console.log('[assignmentAllClass] ERROR', classid);
      setContent(res.data.data)
    } catch (err) {
      console.log('[assignmentAllClass] ERROR');
    }
  };

  const mappedTextColor = (status: string) => {
    switch (status) {
      case "ได้รับมอบหมาย":
        return onClassColorTheme.green;
      case "ส่งแล้ว":
        return onClassColorTheme.grey;
      case "เลยกำหนด":
      case "ส่งช้า":
        return onClassColorTheme.error;  
    }
  }

  const onClickASM = (id: string) => {
    navigate(`/${classid}/assignment/${id}`);
  }

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
        <Box display="flex" flexDirection="column" gap="21px">
          {content.map((item: getAllAssignmentsResponse) => (
            <AsmCard
              title={item.assignment_name}
              midText={formatShortDate(item.assignment_end_date)}
              trailText={item.status}
              trailTextColor={mappedTextColor(item.status)}
              onClick={() => onClickASM(item.id)}
            />
          ))}
        </Box>
      </Box>
    </>
  );
};

export default ClassAssignments;
