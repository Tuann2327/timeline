import React, { useEffect, useState } from 'react';
import { Badge ,InputNumber, Typography, Button, Tabs, Divider, Card, Empty, Segmented, ConfigProvider, Space, Avatar} from 'antd';
import { Calendar,theme, Collapse,List  } from 'antd';
import { Col, Row } from 'antd';
import dayjs from 'dayjs';
import { LeftCircleTwoTone, LeftOutlined, RightCircleTwoTone, RightOutlined } from '@ant-design/icons';
//firebase
import { initializeApp } from 'firebase/app';
import { doc, setDoc, getDoc, getDocs, collection, deleteDoc} from "firebase/firestore"; 
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBmsw-XWgmJEDSJWSaKrGFihx7hCt4MGhc",
    authDomain: "timelinememo-ba189.firebaseapp.com",
    projectId: "timelinememo-ba189",
    storageBucket: "timelinememo-ba189.appspot.com",
    messagingSenderId: "440148032364",
    appId: "1:440148032364:web:2d2b993fa0d2a85d605149",
    measurementId: "G-LLY30YEW4Q"
  };
  
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const { Text, Link, Paragraph } = Typography;

const InputStat = (props) =>{

    return(
    <>
    <Divider>Input Today Data</Divider>
    <Row  gutter={[5, 5]}>
        <Col span={24}>
            <InputNumber style={{ width: '100%' }}
                value={props.Data.earning}
                onChange={props.onEarningChange}
                placeholder="Earing"
                prefix={<img width="32" height="32" src="https://img.icons8.com/stickers/100/stack-of-money.png" alt="stack-of-money"/>}
            />
        </Col>
        <Col span={24}>
            <InputNumber style={{ width: '100%' }}
                value={props.Data.time}
                onChange={props.onTimeChange}
                placeholder="Time"
                prefix={<img width="32" height="32" src="https://img.icons8.com/stickers/100/clock--v1.png" alt="time"/>}
            />
        </Col>
        <Col span={24}>

            <InputNumber style={{ width: '100%' }}
                value={props.Data.mile}
                onChange={props.onMileChange}
                placeholder="Distance"
                prefix={<img width="32" height="32" src="https://img.icons8.com/stickers/100/journey.png" alt="distance"/>}
            />
        </Col>
        <Col span={24}>
            <InputNumber style={{ width: '100%' }}
                value={props.Data.gas}
                onChange={props.onGasChange}
                placeholder="Gas"
                prefix={<img width="32" height="32" src="https://img.icons8.com/stickers/100/gas-pump.png" alt="gas"/>}
            />
        </Col>
    </Row>
    </>)
}

const DateStat = (props)=>{
    let gasPrice = props.Data.gas||(props.Data.mile/20)*3.19
    let total = props.Data.earning - gasPrice
    return(<>
    <Row >
        <Col span={24}>
        <Collapse ghost
        size="large"
        items={[
            {
            key: '1',
            label:  <List
                        size="small"
                        bordered>
                        <List.Item>
                            <Row>
                                <img width="32" height="32" src="https://img.icons8.com/stickers/100/stack-of-money.png" alt="time"/>
                                <span style={{margin:'auto 10px'}}>Earning</span>
                            </Row>
                        </List.Item>
                        <List.Item>
                            <Paragraph 
                                editable={{
                                    onChange: props.onEarningChange,
                                    text: props.Data.earning.toString(),
                                }} 
                                style={{margin:0,fontSize:'1.7rem',color:'green'}}>${props.Data.earning}</Paragraph>
                            <Paragraph style={{margin:0,fontSize:'1rem',color:'grey'}}>${(total/props.Data.time).toFixed(2)}/hr</Paragraph>
                        </List.Item>
                    </List>,
            children:   <Row justify='space-evenly' >
                            <Col span={12}>
                                <Text>Earning:</Text>
                            </Col>
                            <Col span={12} style={{textAlign:'right'}} >
                                <Text style={{color:'green'}}>+ ${Number(props.Data.earning).toFixed(1)||'NaN'}</Text>
                            </Col>
                            <Col span={12}>
                                <Text>Gas:</Text>
                            </Col>
                            <Col span={12} style={{textAlign:'right'}}>
                                <Text style={{color:'darkred'}}>- ${Number(gasPrice).toFixed(1)||'NaN'}</Text>
                            </Col>
                            <Divider style={{margin:'5px'}}></Divider>
                            <Col span={12}>
                                <Text>Total in</Text>
                                <Text style={{color:'plum'}}> {props.Data.time||'NaN'} </Text>
                                <Text >hours</Text>
                            </Col>
                            <Col span={12} style={{textAlign:'right'}}>
                                <Text> ${total.toFixed(1)}</Text>
                            </Col>
                            <Divider style={{margin:'5px'}}></Divider>
                            <Col span={12}>
                                <Text>Earned Rate:</Text>
                            </Col>
                            <Col span={12} style={{textAlign:'right'}}>
                                <Text> ${(total/props.Data.time).toFixed(1)}/hr</Text>
                            </Col>
                        </Row>,
            showArrow: false,
            },
        ]}
        />
        </Col>

        <Col span={24}>
           <List
                size="small"
                bordered
            >
            <List.Item >
                <Row>
                    <img width="32" height="32" src="https://img.icons8.com/stickers/100/journey.png" alt="time"/>
                    <span style={{margin:'auto 10px'}}>Distance:</span>
                </Row>
                <Paragraph
                    editable={{
                        onChange: props.onMileChange,
                        text: props.Data.mile.toString(),
                    }} 
                    style={{margin:0,fontSize:'1rem',color:'black'}}>{props.Data.mile||'NaN'} mi</Paragraph>
            </List.Item>
            <List.Item>
                <Row>
                    <img width="32" height="32" src="https://img.icons8.com/stickers/100/clock--v1.png" alt="time"/>
                    <span style={{margin:'auto 10px'}}>Drive Time:</span>
                </Row>
                <Paragraph
                    editable={{
                        onChange: props.onTimeChange,
                        text: props.Data.time.toString(),
                    }} 
                    style={{margin:0,fontSize:'1rem',color:'black'}}>{props.Data.time||'NaN'} hrs</Paragraph>
            </List.Item>
            <List.Item>
                <Row>
                    <img width="32" height="32" src="https://img.icons8.com/stickers/100/gas-pump.png" alt="time"/>
                    <span style={{margin:'auto 10px'}}>Gas:</span>
                </Row>
                <Paragraph
                    editable={{
                        onChange: props.onGasChange,
                        text: props.Data.gas.toString(),
                    }} 
                    style={{margin:0,fontSize:'1rem'}}>{props.Data.gas?'$'+props.Data.gas:<Text italic>Estimated ${gasPrice.toFixed(1)}</Text>}</Paragraph>
            </List.Item>
            </List>
        </Col>
    </Row>
    </>)
}

const MonthStat = (props)=>{
    let gasPrice = props.Data.gas||(props.Data.mile/20)*3.19
    let total = props.Data.earning - gasPrice
    return(<>
    <Row >
        <Col span={24}>
        <Collapse ghost
        size="large"
        items={[
            {
            key: '1',
            label:  <List
                        size="small"
                        bordered>
                        <List.Item>
                            <Row>
                                <img width="32" height="32" src="https://img.icons8.com/stickers/100/stack-of-money.png" alt="time"/>
                                <span style={{margin:'auto 10px'}}>Earning</span>
                            </Row>
                        </List.Item>
                        <List.Item>
                            <Paragraph style={{margin:0,fontSize:'1.7rem',color:'green'}}>${props.Data.earning}</Paragraph>
                            <Paragraph style={{margin:0,fontSize:'1rem',color:'grey'}}>${(total/props.Data.time).toFixed(2)}/hr</Paragraph>
                        </List.Item>
                    </List>,
            children:   <Row justify='space-evenly' >
                            <Col span={12}>
                                <Text>Earning:</Text>
                            </Col>
                            <Col span={12} style={{textAlign:'right'}} >
                                <Text style={{color:'green'}}>+ ${Number(props.Data.earning).toFixed(1)||'NaN'}</Text>
                            </Col>
                            <Col span={12}>
                                <Text>Gas:</Text>
                            </Col>
                            <Col span={12} style={{textAlign:'right'}}>
                                <Text style={{color:'darkred'}}>- ${Number(gasPrice).toFixed(1)||'NaN'}</Text>
                            </Col>
                            <Divider style={{margin:'5px'}}></Divider>
                            <Col span={12}>
                                <Text>Total </Text>
                            </Col>
                            <Col span={12} style={{textAlign:'right'}}>
                                <Text strong> ${total.toFixed(1)}</Text>
                            </Col>
                            <Col span={12}>
                                <Text>Earned Rate:</Text>
                            </Col>
                            <Col span={12} style={{textAlign:'right'}}>
                                <Text> ${(total/props.Data.time).toFixed(1)}/hr</Text>
                            </Col>
                            <Divider style={{margin:'5px'}} orientation="right" orientationMargin={0} plain>
                                <Text style={{color:'darkred'}}>- ${(total*0.153).toFixed(1)} </Text>
                                  Tax (-15.3%)
                            </Divider>
                            <Col span={12}>
                                <Text>Total </Text>
                            </Col>
                            <Col span={12} style={{textAlign:'right'}}>
                                <Text strong> ${(total*(1-0.153)).toFixed(1)}</Text>
                            </Col>
                            <Col span={12}>
                                <Text>Earned Rate:</Text>
                            </Col>
                            <Col span={12} style={{textAlign:'right'}}>
                                <Text> ${(total*(1-0.153)/props.Data.time).toFixed(1)}/hr</Text>
                            </Col>
                        </Row>,
            showArrow: false,
            },
        ]}
        />
        </Col>

        <Col span={24}>
           <List
                size="small"
                bordered
            >
            <List.Item >
                <Row>
                    <img width="32" height="32" src="https://img.icons8.com/stickers/100/journey.png" alt="time"/>
                    <span style={{margin:'auto 10px'}}>Distance:</span>
                </Row>
                <Paragraph style={{margin:0,fontSize:'1rem',color:'black'}}>{props.Data.mile||'NaN'} mi</Paragraph>
            </List.Item>
            <List.Item>
                <Row>
                    <img width="32" height="32" src="https://img.icons8.com/stickers/100/clock--v1.png" alt="time"/>
                    <span style={{margin:'auto 10px'}}>Drive Time:</span>
                </Row>
                <Paragraph style={{margin:0,fontSize:'1rem',color:'black'}}>{props.Data.time||'NaN'} hrs</Paragraph>
            </List.Item>
            <List.Item>
                <Row>
                    <img width="32" height="32" src="https://img.icons8.com/stickers/100/gas-pump.png" alt="time"/>
                    <span style={{margin:'auto 10px'}}>Gas:</span>
                </Row>
                <Paragraph style={{margin:0,fontSize:'1rem'}}>${props.Data.gas||' No Pump'}</Paragraph>
            </List.Item>
            </List>
        </Col>
    </Row>
    </>)
}


const Main = ()=>{
    const [currentDay,SetDate]= useState(()=>dayjs())
    const [tabKey,setTab] = useState()
    const [earning,setEarning] = useState()
    const [time,setTime] = useState()
    const [mile,setMile] = useState()
    const [gas,setGas] = useState()

    const [monthData, setMonthData] = useState()
    const [driveDate, setDriveDate] = useState()
    const [calendarMode,setCalendarMode]=useState('month');

    const [isUpdate,setUpdate] = useState(false)
    const [isData,setIsData] = useState(false)
    const [isMData,setIsMData] = useState(false)
    const [newDataFlag,setDataFlag] = useState(false)


    const { token } = theme.useToken();

    const updateStat= async()=>{
        setUpdate(true)
        try{
            await setDoc(doc(db, currentDay?.format('MM-YYYY'), currentDay?.format('YYYY-MM-DD')), {
                date: currentDay?.format('YYYY-MM-DD'),
                earning: earning || 0,
                time: time || 0,
                mile: mile || 0,
                gas: gas || 0,
            });
            setDataFlag(!newDataFlag)
        }
        catch(e){

        }
        setUpdate(false)
    }
    const deleteStat= async()=>{
        setUpdate(true)
        try{
            await deleteDoc(doc(db, currentDay?.format('MM-YYYY'), currentDay?.format('YYYY-MM-DD')));
            setDataFlag(!newDataFlag)
        }
        catch(e){

        }
        setUpdate(false)
    }

    const GetInfo = (toogle)=>{
        if(toogle===1) {
            return{
            earning:earning||0,
            mile:mile||0,
            time:time||0,
            gas:gas||0}
        }
        return{earning,mile,time,gas}
    }

    useEffect( ()=>{
        let getData = async ()=>{
            const docRef = doc(db, currentDay?.format('MM-YYYY'), currentDay?.format('YYYY-MM-DD'));
            const docSnap = await getDoc(docRef);
            if(docSnap.data()){
                const data = docSnap.data();
                setEarning(data.earning)
                setTime(data.time)
                setMile(data.mile)
                setGas(data.gas)
                setIsData(true)
            } 
            else{
                setEarning()
                setTime()
                setMile()
                setGas()
                setIsData(false)
            }        
        }
        let getMonthData = async ()=>{
            const docSnap = await getDocs(collection(db, currentDay?.format('MM-YYYY')));
            let monthData = docSnap.docs.map(doc=>doc.data())
            console.log(monthData.map(doc=>{return {'date':doc.date,'earning':doc.earning} }))
            if(monthData.length>0){
                let newData ={
                    earning:monthData.reduce((ac,value)=>ac+Number(value.earning),0),
                    time:monthData.reduce((ac,value)=>ac+Number(value.time),0),
                    mile:monthData.reduce((ac,value)=>ac+Number(value.mile),0),
                    gas:monthData.reduce((ac,value)=>ac+Number(value.gas),0),
                }
                setDriveDate(monthData.map(doc=>{return {'date':doc.date,'earning':doc.earning} }))
                setMonthData(newData)
                setIsMData(true)
            }
            else{
                setIsMData(false)
            }
        }
        getData();
        getMonthData();
        
        if(calendarMode==='month') setTab('Daily')
        else setTab('Monthly')
    },[currentDay,newDataFlag]) 

    const onTabChange=(value)=>{
        setTab(value)
    }

    const onPanelChange = (value, mode) => {
        console.log( mode);
        setCalendarMode(mode)
        if(mode==='month') setTab('Daily')
        else setTab('Monthly')
    };

    const onDateChange = (value, mode) =>{
        SetDate(value)
        setTab('Daily')
        console.log(mode)
    }

    const nextDate = ()=>{
        SetDate(currentDay.add(1,'day'));
        setCalendarMode('month')
    }
    const toDay = ()=>{
        SetDate(dayjs());
        setCalendarMode('month')
    }

    const previousDate = ()=>{
        SetDate(currentDay.add(-1,'day'));
        setCalendarMode('month')
    }

    const onEarningChange = (value)=>{
        setEarning(value)
    }
    const onTimeChange = (value)=>{
        setTime(value)
    }
    const onMileChange = (value)=>{
        setMile(value)
    }
    const onGasChange = (value)=>{
        setGas(value)
    }

    const wrapperStyle = {
        margin: 'auto',
        width: '100%',
        border: `2px solid ${token.colorBorderSecondary}`,
        borderRadius: token.borderRadiusLG,
    };
    const dateChangeStyle = {
        margin: '15px auto',
        width: '90%',
    };

    //Custom calendar
    const getListData = (value) => {
        let listData;
        console.log('hi')
        if(driveDate){
            let index= driveDate.find(el=>{
                // console.log( value.format('YYYY-MM-DD') == el.date)
                return (value.format('YYYY-MM-DD') == el.date) 
            } );
            listData = index?Number(index.earning).toFixed(1):0;
        }
        return listData || 0;
      };
      
    const monthCellRender = (value) => {
        return (
            <div style={value.isSame(currentDay,'month')?CalendarCellStytle.normal:CalendarCellStytle.fade}>
              {value.format('MMM')}
            </div>
          );
    };
    
    let CalendarCellStytle = {
        normal:{
            margin:'10px'
        },
        fade:{
            margin:'10px',
            color:'darkgray'
        }
    }

    const dateCellRender = (value, info) => {
    const listData = getListData(value);
        return (
            React.cloneElement(info.originNode, {
                ...info.originNode.props,
                children: (
                    <>
                        <Badge 
                            count={listData>0?'$'+listData:''}
                            style={{ backgroundColor: '#52c41a'}}
                        >
                            <Text style={value.isSame(currentDay,'month')?CalendarCellStytle.normal:CalendarCellStytle.fade}>{value.get('date')}</Text>
                        </Badge>
                    </>
                ),
              })
            
        );
    };

      const cellRender = (current, info) => {
        if (info.type === 'date') return dateCellRender(current,info);
        if (info.type === 'month') return monthCellRender(current,info);
        return info.originNode;
      };
    

    // Render Page
    return (
    <>
        <Row style={dateChangeStyle} justify='space-between'>
            <Col span={1}> <Link style={{fontSize:'1.1rem'}} onClick={previousDate}><LeftCircleTwoTone /></Link> </Col>
            <Col span={22} style={{textAlign: 'center'}}> 
                <Text style={{fontSize:'1.1rem'}}>{tabKey=='Daily'?currentDay.format('ddd, MM-DD-YYYY'):currentDay.format('MMMM-YYYY')}</Text>
                {!currentDay.isSame(dayjs())?<Link style={{fontSize:'1.1rem'}} onClick={toDay}> {'[Today]'}</Link>:''}
                
            </Col>
            <Col span={1}> <Link style={{fontSize:'1.1rem'}} onClick={nextDate}><RightCircleTwoTone /></Link> </Col>
        </Row>
        <Segmented
            onChange={onTabChange}
            value={tabKey}
            options={['Daily', 'Monthly']}
        >

        </Segmented>
        {tabKey==='Daily'
        ?(isData)
            ?<DateStat
             onEarningChange={onEarningChange} 
             onGasChange={onGasChange} 
             onTimeChange={onTimeChange} 
             onMileChange={onMileChange} 
             Data={GetInfo(1)}
            />
            :<InputStat
            onEarningChange={onEarningChange} 
            onGasChange={onGasChange} 
            onTimeChange={onTimeChange} 
            onMileChange={onMileChange} 
            Data={GetInfo()}
            />
        :(isMData)
            ?<MonthStat
            Data={monthData}
            />
            :<Empty></Empty>
        }
        <Button disabled={tabKey==='Monthly'} loading={isUpdate} onClick={updateStat} type="primary" style={{ width: '100%', height:'auto',fontSize: '1.15rem', margin:'10px 0px' }}>Update</Button>
        <Button disabled={!isData || tabKey=='Monthly'} loading={isUpdate} onClick={deleteStat} danger style={{ width: '100%', height:'auto',fontSize: '1.15rem', margin:'0px 0px 10px' }}>Delete</Button>
        <br></br>
        <div style={wrapperStyle}>
        <Calendar fullCellRender={cellRender} mode={calendarMode} value={currentDay} fullscreen={false} onPanelChange={onPanelChange} onChange={onDateChange} />
        </div>
    </>
    )
    
}

export default Main