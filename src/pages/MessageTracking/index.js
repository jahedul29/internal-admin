import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { Paper, TextField, TableContainer, Table, TableHead, TableBody, TableCell, Button, TableRow, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Alert } from '@mui/material';
import { getAsync } from './../../services/httpClient/HttpClient';
import Loader from './../../components/Loader/index';

const MessageTracking = () => {
    const [messageId, setMessageId] = useState("");
    const [destination, setDestination] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const [messageDetails, setMessageDetails] = useState(null);
    const [searchBy, setSearchBy] = useState("messageId");
    const [errorMsg, setErrorMsg] = useState("");

    const handleSearch = async (e, type="") => {
        if (e.keyCode === 13 || type === "click") {
            setIsSearching(true);
            const url = `/sms/tracking/${searchBy}?${searchBy === "messageId" ? `messageId=${messageId}` : `destination=${destination}`}`;
            const response = await getAsync(url);

            if (response.status === 200) {
                setErrorMsg("");
                const id = Object.keys(response.data).join("");
                setMessageDetails(response?.data[id] ? response?.data[id] : null);
            } else {
                setErrorMsg(response?.response?.data?.message);
            }
            setIsSearching(false);
        } else if (e.target.value !== "") {
            if (searchBy === "messageId") {
                setMessageId(e.target.value)
            } else {
                setDestination(e.target.value)
            }
        }

    }

    const mapValues = (value) => {
        switch (value[0]) {
            case "messageTimestamp":
            case "doneDate":
            case "submitDate":
                return new Date(value[1]).toLocaleString();
            default:
                return value;
        }

    }

    return (
        <Layout>
            <div className="statistic-page-container w-full">
                <div className='w-full flex'>
                    {
                        searchBy === "messageId" && (
                            <TextField
                                sx={{ width: 300, marginRight: '20px' }}
                                label="Message Id"
                                onChange={(e) => setMessageId(e.target.value)}
                                onKeyDown={(e) => handleSearch(e)}
                                value={messageId}
                            />
                        )
                    }

                    {
                        searchBy === "dest" && (
                            <TextField
                                label="Destination Id"
                                sx={{ width: 300, marginRight: '20px' }}
                                onChange={(e) => setDestination(e.target.value)}
                                onKeyDown={(e) => handleSearch(e)}
                                value={destination}
                            />
                        )
                    }

                    <FormControl>
                        <FormLabel id="demo-row-radio-buttons-group-label">Search By</FormLabel>
                        <RadioGroup
                            row
                            onChange={(e) => setSearchBy(e.target.value)}
                            value={searchBy}
                        >
                            <FormControlLabel value="messageId" control={<Radio />} label="Message Id" />
                            <FormControlLabel value="dest" control={<Radio />} label="Destination" />
                        </RadioGroup>
                    </FormControl>

                    <Button className="h-[53px] !bg-[#F05D23] !hover:bg-[#EAA273]" sx={{marginLeft: '20px'}} variant="contained" onClick={(e)=>handleSearch(e, "click")}>Search</Button>
                </div>
                <hr className="my-4" />
                {
                    errorMsg && <Alert className="mb-5" severity="error">{errorMsg}</Alert>
                }

                {
                    isSearching ? (
                        <Loader />
                    ) : messageDetails === null ? (
                        <div className="h-[50vh] w-full flex items-center justify-center">
                            <p className="text-dark font-bold text-2xl">There is no data to show</p>
                        </div>
                    ) : (
                        <TableContainer component={Paper} className="bg-gray">
                            <Table sx={{ minWidth: 650, background: '#F5F5ED' }} aria-label="simple table">
                                <TableBody>
                                    {
                                        messageDetails && Object.entries(messageDetails).map(row => (
                                            <TableRow
                                                key={row[0]}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell>{row[0]}</TableCell>
                                                <TableCell>{mapValues(row)}</TableCell>
                                            </TableRow>
                                        ))
                                    }
                                    {/* <TableCell align="right">{row.sender}</TableCell> */}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )
                }

            </div>
        </Layout>
    );
};

export default MessageTracking;