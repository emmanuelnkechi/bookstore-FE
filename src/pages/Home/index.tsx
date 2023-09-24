import { useEffect, useState } from "react";
import TableComponent from "../../components/table/index";
import './index.scss'
import Book from '../../assets/images/download.jpeg'
import { EyeIcon } from "../../assets/icons/EyeIcon";
import { TrashIcon } from "../../assets/icons/TrashIcon";
import { useGetAllBooksQuery, useDeleteBookMutation } from "../../services";
import {
    Button,
    Select,
    MenuItem,
    Chip,
    IconButton,
    CircularProgress,
    Skeleton,
} from "@mui/material";
import moment from "moment";
import MessageModal from "../../components/Modals/MessageModal";
import { showToast } from "../../store/store.hooks";
import { IBook } from "../../models";
import { TextField } from "@mui/material";


const headCell = [
    {
        key: "title",
        name: "Title",
    },
    {
        key: "author",
        name: "Author",
    },
    {
        key: "quantity",
        name: "Quantity",
    },

    {
        key: "type",
        name: "Type",
    },

    {
        key: "publicationYear",
        name: "Publication Year",
    },
    {
        key: "action",
        name: "",
    },
];

export const Home = () => {
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [idTobeDeleted, setIdTobeDeleted] = useState('');
    const [filter, setFilter] = useState('');

    const [deleteBook, { isLoading: loadDelete }] = useDeleteBookMutation();
    const { data: allBooks, isLoading } = useGetAllBooksQuery({ title: filter, orderBy: 'asc' });


    console.log('allBooks', allBooks)

    const deleteBookFunc = async (id: string, callback?: () => void) => {
        try {
            let result = await deleteBook({ id });
            if ("data" in result) {
                setOpenDeleteModal(false);
                setIdTobeDeleted("");
                callback && callback();
                showToast('You have deleted this book', 'success')
            }
            else {
                showToast('An error occured', 'error')
            }
        } catch (error) {
            showToast('An error occured', 'error')
            setIdTobeDeleted("");
        }
    };

    return (
        <div>
            <MessageModal
                openModal={openDeleteModal}
                closeModal={() => {
                    setOpenDeleteModal(false);
                }}
                icon={<TrashIcon stroke="#5C636D" />}
                btnChild={
                    <Button
                        onClick={() => {
                            deleteBookFunc(idTobeDeleted, () => {
                                setOpenDeleteModal(false);
                            });
                        }}
                        className="error"
                    >
                        {loadDelete ? (
                            <CircularProgress size="1.5rem" sx={{ color: "#ffffff" }} />
                        ) : (
                            "Yes, delete"
                        )}
                    </Button>
                }
                description="Are you sure you want to delete this book?"
            />
            <div className="table_section">
                <div className="table_action_container">
                    <TextField
                        className="text-field"
                        label="Filter by Title"
                        name="title"
                        value={filter}
                        onChange={(e) => { setFilter(e.target.value) }}
                    />
                    <TableComponent
                        // isError={false}
                        isLoading={isLoading}
                        headCells={headCell}

                        tableData={allBooks?.data?.map((row: IBook, i: number) => ({
                            //   ...row,
                            title: row?.title,
                            author: row?.author,
                            quantity: row?.quantity,
                            type: (
                                <Chip
                                    color='success'
                                    label={`${row?.type}`}
                                />
                            ),
                            publicationYear: `${moment(row?.publicationYear).calendar()} `,

                            action: (
                                <div className="flex gap-[28px] justify-end">
                                    <IconButton
                                        onClick={(e) => {
                                            setIdTobeDeleted(row?._id as string);
                                            setOpenDeleteModal(true);
                                            e.stopPropagation();
                                        }}
                                        type="button"
                                        className="icon_button_container"
                                    >
                                        <TrashIcon />
                                    </IconButton>

                                    <IconButton
                                        onClick={() => {
                                            //   navigate(i);
                                        }}
                                        type="button"
                                        className="icon_button_container"
                                    >
                                        <EyeIcon />
                                    </IconButton>
                                </div>
                            ),
                            id: i,
                        }))}
                    />
                </div>
            </div>

        </div>


    )
}