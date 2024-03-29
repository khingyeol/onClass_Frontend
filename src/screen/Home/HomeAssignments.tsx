import { Box, Theme, Typography, useMediaQuery } from "@mui/material";
import { AxiosError } from "axios";
import React, { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onClassColorTheme } from "../../common/theme/onClassColorTheme";
import AsmCard from "../../components/Home/AsmCard";
import { assignmentAllClass, getTodo } from "../../services/class/api_class";
import { getAllAssignmentsResponse } from "../../services/types/ClassModel";
import { formatShortDate } from "../../utils/formatDate";

const HomeAssignments: FC = () => {
  const isDesktop = useMediaQuery((theme: Theme) => theme.breakpoints.up("sm"));
  const [content, setContent] = useState<getAllAssignmentsResponse[]>([]);
  const navigate = useNavigate();

  const fetchGetAllAsm = async () => {
    try {
      const res = await assignmentAllClass();
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

  const onClickASM = (class_code: string, id: string) => {
    navigate(`/${class_code}/assignment/${id}`);
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
              desc={item.class_name}
              midText={formatShortDate(item.assignment_end_date)}
              trailText={item.status}
              trailTextColor={mappedTextColor(item.status)}
              onClick={() => onClickASM(item.class_code, item.id)}
            />
          ))}
        </Box>
      </Box>
    </>
  );
};

export default HomeAssignments;
