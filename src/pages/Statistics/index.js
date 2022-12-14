import { Autocomplete, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Button, Alert } from '@mui/material';
import { addDays } from 'date-fns/esm';
import React, { useEffect, useState } from 'react';
import { Calendar, DateRangePicker } from 'react-date-range';
import Layout from '../../components/Layout';
import Loader from '../../components/Loader';
import { getAsync } from './../../services/httpClient/HttpClient';

const companyOptions = [
    {
        "id": 1,
        "name": "AnyMessage",
        "code": "AMG"
    },
    {
        "id": 2,
        "name": "test1",
        "code": "t01"
    },
    {
        "id": 3,
        "name": "test2",
        "code": "t02"
    },
    {
        "id": 4,
        "name": "test3",
        "code": "tt3"
    },
    {
        "id": 5,
        "name": "My cool Company & Co.",
        "code": "MCC"
    }
]

const statistics = [
    {
        "id": "1",
        "sender": "491520123456780",
        "recipient": "46123",
        "countryId": "79",
        "networkOperatorId": "2015",
        "linkId": "10",
        "deliveryStatus": 2,
        "messageTimestamp": "2022-11-15 11:07:28"
    },
    {
        "id": "2",
        "sender": "491520123456780",
        "recipient": "46123",
        "countryId": "79",
        "networkOperatorId": "2015",
        "linkId": "10",
        "deliveryStatus": 2,
        "messageTimestamp": "2022-11-15 11:07:28"
    },
    {
        "id": "3",
        "sender": "491520123456780",
        "recipient": "46123",
        "countryId": "79",
        "networkOperatorId": "2015",
        "linkId": "10",
        "deliveryStatus": 2,
        "messageTimestamp": "2022-11-15 11:07:28"
    },
    {
        "id": "4",
        "sender": "491520123456780",
        "recipient": "46123",
        "countryId": "79",
        "networkOperatorId": "2015",
        "linkId": "10",
        "deliveryStatus": 2,
        "messageTimestamp": "2022-11-15 11:07:28"
    },
    {
        "id": "5",
        "sender": "491520123456780",
        "recipient": "46123",
        "countryId": "79",
        "networkOperatorId": "2015",
        "linkId": "10",
        "deliveryStatus": 2,
        "messageTimestamp": "2022-11-15 11:07:29"
    },
    {
        "id": "6",
        "sender": "491520123456780",
        "recipient": "46123",
        "countryId": "79",
        "networkOperatorId": "2015",
        "linkId": "10",
        "deliveryStatus": 2,
        "messageTimestamp": "2022-11-15 11:07:29"
    },
    {
        "id": "7",
        "sender": "491520123456780",
        "recipient": "46123",
        "countryId": "79",
        "networkOperatorId": "2015",
        "linkId": "10",
        "deliveryStatus": 2,
        "messageTimestamp": "2022-11-15 11:07:29"
    },
    {
        "id": "8",
        "sender": "491520123456780",
        "recipient": "46123",
        "countryId": "79",
        "networkOperatorId": "2015",
        "linkId": "10",
        "deliveryStatus": 2,
        "messageTimestamp": "2022-11-15 11:07:29"
    },
    {
        "id": "9",
        "sender": "491520123456780",
        "recipient": "46123",
        "countryId": "79",
        "networkOperatorId": "2015",
        "linkId": "10",
        "deliveryStatus": 2,
        "messageTimestamp": "2022-11-15 11:07:29"
    }
]

const Statistics = () => {
    const [companyList, setCompanyList] = useState([]);
    const [accountList, setAccountList] = useState([]);
    const [selectedCompany, setSelectedCompany] = useState("");
    const [selectedAccount, setSelectedAccount] = useState("");
    const [startTime, setStartTime] = useState("2022-11-01 10:00:00");
    const [endTime, setEndTime] = useState("2022-11-31 11:00:01");
    const [statisticsData, setStatisticsData] = useState([]);
    const [isLoadingStatisticsData, setIsLoadingStatisticsData] = useState(false);
    const [selectedDate, setSelectedDate] = useState([
       {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ]);
    const [isDateRangePickerOpen, setIsDateRangePickerOpen] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const getCompanies = async () => {
        const response = await getAsync(`/data/get/companies`);
        if (response.status === 200) {
            setCompanyList(Object.values(response.data))
        }
    }

    const getAccounts = async () => {
        const response = await getAsync(`/data/get/serviceAccounts`);
        if (response.status === 200) {
            setAccountList(Object.values(response.data))
        }
    }

    useEffect(() => {
        getCompanies();
        getAccounts();
    }, []);

    const handleSearch = async () => {
        setIsDateRangePickerOpen(false);
        setIsLoadingStatisticsData(true);
        const response = await getAsync(`/sms/statistic?userId=${selectedAccount}&companyId=${selectedCompany}&startTime=${selectedDate[0].startDate}&endTime=${selectedDate[0].endDate}`);

        if (response.status === 200) {
            setErrorMsg("");
            setStatisticsData(Object.values(response.data))
            setIsLoadingStatisticsData(false);
        } else {
            setErrorMsg(response?.response?.data?.message);
            setIsLoadingStatisticsData(false);
        }
    }

    const handleClear = () => {
        setSelectedAccount("");
        setSelectedCompany("");
        setSelectedDate([
            {
                startDate: "",
                endDate: "",
                key: "selection"
            }
        ])
    }

    
    return (
        <Layout>
            <div className="statistic-page-container w-full">
                <div className='w-full flex relative'>
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={companyList}
                        getOptionLabel={(option) => option.name}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Company" />}
                        onChange={(event, newValue) => {
                            setSelectedCompany(newValue.id);
                        }}
                    />
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        className='ml-3'
                        options={accountList}
                        getOptionLabel={(option) => option.name}
                        sx={{ width: 300, marginRight: '20px' }}
                        renderInput={(params) => <TextField {...params} label="Account" />}
                        onChange={(event, newValue) => {
                            setSelectedAccount(newValue.id);
                        }}
                    />
                    <div className='relative'>
                        <TextField
                            sx={{ width: 300, marginRight: '20px' }}
                            label=""
                            value={selectedDate[0].startDate.toLocaleString()}
                            disabled
                            onClick={()=> setIsDateRangePickerOpen(prev => !prev)}
                            placeholder="Start Date"
                        />
                        <TextField
                            sx={{ width: 300, marginRight: '20px' }}
                            label=""
                            value={selectedDate[0].endDate.toLocaleString()}
                            disabled
                            onClick={()=> setIsDateRangePickerOpen(prev => !prev)}
                            placeholder="End Date"
                        />

                        {
                            isDateRangePickerOpen && (
                                <div className="absolute top-20 right-0">
                                    <DateRangePicker
                                        onChange={item => {
                                            setSelectedDate([item.selection])
                                        }}
                                        months={1}
                                        direction="vertical"
                                        scroll={{ enabled: false }}
                                        ranges={selectedDate}
                                        showDateDisplay={false}
                                    />;
                                </div>
                            )
                        }
                    </div>
                    
                    
                    

                    <Button className="h-[53px] !bg-[#F05D23] !hover:bg-[#EAA273]" sx={{marginRight: '20px'}} variant="contained" onClick={handleSearch}>Search</Button>
                    <Button className="h-[53px] !bg-gray-600 !hover:bg-gray-300" variant="contained" onClick={handleClear}>Clear</Button>
                </div>
                <hr className="my-5"/>
                {
                    errorMsg && <Alert className="mb-5" severity="error">{errorMsg}</Alert>
                }
                {
                    isLoadingStatisticsData && <Loader />
                }
                {
                    !isLoadingStatisticsData && (
                        <TableContainer component={Paper} className="bg-gray">
                            <Table sx={{ minWidth: 650, background: '#F5F5ED' }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>ID</TableCell>
                                        <TableCell align="right">Sender</TableCell>
                                        <TableCell align="right">Recipient</TableCell>
                                        <TableCell align="right">Country Id</TableCell>
                                        <TableCell align="right">Network Operator Id</TableCell>
                                        <TableCell align="right">Link Id</TableCell>
                                        <TableCell align="right">Delivery Status</TableCell>
                                        <TableCell align="right">Time</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {statisticsData?.map((row) => (
                                        <TableRow
                                            key={row.name}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {row.id}
                                            </TableCell>
                                            <TableCell align="right">{row.sender}</TableCell>
                                            <TableCell align="right">{row.recipient}</TableCell>
                                            <TableCell align="right">{row.countryId}</TableCell>
                                            <TableCell align="right">{row.networkOperatorId}</TableCell>
                                            <TableCell align="right">{row.linkId}</TableCell>
                                            <TableCell align="right">{row.deliveryStatus}</TableCell>
                                            <TableCell align="right">{new Date(row.messageTimestamp).toLocaleString()}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )
                }

            </div>
        </Layout>
    );
};

export default Statistics;