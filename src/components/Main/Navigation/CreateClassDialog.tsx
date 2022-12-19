import {
  Box,
  Button,
  Dialog,
  Menu,
  MenuItem,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { FC, useState } from "react";
import { alpha, Theme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme: Theme) => ({
  dialogCreate: {
    // borderRadius: "50px",
    width: "100%",
    height: "50%",
  },
}));

interface CreateClassDialogProps {
  open: boolean;
  onClose: () => void;
}
const CreateClassDialog: FC<CreateClassDialogProps> = (props) => {
  const { open, onClose } = props;
  const classes = useStyles();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        className: classes.dialogCreate,
        style: {
          borderRadius: "35px",
        },
      }}
    >
      <Box padding="20px">
        <Box display="flex">
        <div className=''>
            <div
              className=" justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50"

            >
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                {/*content*/}
                <div className="box shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                    <h3 className="text-3xl font-semibold">
                      Create Class
                    </h3>
                  </div>
                  {/*body*/}
                  <form className="p-6 space-y-2">

                  <div className="relative flex-auto">
                    <span className=" text-grey">Class Name :</span>
                        <input 
                        type="text" 
                        className="tf w-full focus:outline-none focus:ring-2 focus:ring-green" 
                        placeholder="" 
                        name="class_name"
                        // value={inputsJoin.class_name}
                        // onChange={handleChangeJoin}
                        />
                  </div>

                  <div className="relative flex-auto">
                    <span className=" text-grey">Class Subject :</span>
                        <input 
                        type="text" 
                        className="tf w-full focus:outline-none focus:ring-2 focus:ring-green" 
                        placeholder="" 
                        name="class_subject"
                        // value={inputsJoin.class_subject}
                        // onChange={handleChangeJoin}
                        />
                  </div>


                  <div className="relative flex-auto">
                    <div className='flex space-x-4'>
                        <span className="flex-1 text-grey">Class Section :</span>
                        <span className="flex-1 text-grey">Class Room :</span>
                    </div>

                    <div className='flex space-x-4'>
                        <input 
                        type="text" 
                        className="flex-1 tf w-full focus:outline-none focus:ring-2 focus:ring-green" 
                        placeholder="" 
                        name="class_section"
                        // value={inputsJoin.class_section}
                        // onChange={handleChangeJoin}
                        />
                        <input 
                        type="text" 
                        className="flex-1 tf w-full focus:outline-none focus:ring-2 focus:ring-green" 
                        placeholder="" 
                        name="class_room"
                        // value={inputsJoin.class_room}
                        // onChange={handleChangeJoin}
                        />

                    </div>

                  </div>

                  <div className="relative flex-auto">
                    <span className=" text-grey">Class Description :</span>
                        <input 
                        type="text" 
                        className="tf w-full focus:outline-none focus:ring-2 focus:ring-green" 
                        placeholder="" 
                        name="class_description"
                        // value={inputsJoin.class_description}
                        // onChange={handleChangeJoin}
                        />
                  </div>

                  <div className="relative flex-auto">
                    <div className='flex space-x-4 mt-14'>
                        <span className="flex-1 text-grey">Firstname :</span>
                        <span className="flex-1 text-grey">Lastname :</span>
                    </div>

                    <div className='flex space-x-4'>
                        <input 
                        type="text" 
                        className="flex-1 tf w-full focus:outline-none focus:ring-2 focus:ring-green" 
                        placeholder="" 
                        name="firstname"
                        // value={inputsName.firstname}
                        // onChange={handleChangeJoin}
                        />
                        <input 
                        type="text" 
                        className="flex-1 tf w-full focus:outline-none focus:ring-2 focus:ring-green" 
                        placeholder="" 
                        name="lastname"
                        // value={inputsName.lastname} 
                        // onChange={handleChangeJoin}
                        />

                    </div>

                  </div>

                  <div className="relative flex-auto">
                    <span className="flex-1 text-grey leading-relaxed">
                        nickname (Optional) :
                    </span>
                    <input className="tf flex-1"
                    type="text"
                    // value={inputsName.optional_name}
                    name="optional_name"
                    // onChange={handleChangeJoin}
                    ></input>
                  </div>


                  </form>
                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                    <button
                      className=" text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                    //   onClick={() => setcreateModal(false)}
                    >
                      Close
                    </button>
                    <button
                      className="btn bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                    //   onClick={() => setcreateModal(false),onTappedCreate}
                    >
                      Create
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </div>

        </Box>
      </Box>
    </Dialog>
  );
};

export default CreateClassDialog;
