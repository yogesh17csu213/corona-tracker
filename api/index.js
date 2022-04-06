const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express')
const cors = require('cors');
const redis = require('redis')
    
const PORT = 8080

const app=express()
app.use(cors())

;(async () => {
    client = redis.createClient({ host: '127.0.0.1',
    port:'6379'})
  
    client.on('error', (err) => console.log('Redis Client Error', err));
  
    await client.connect()
  })()

const webScrapRepo=()=>{
    return axios({
        url:"https://www.mohfw.gov.in/",
    }) 
}

const scrapperData=(data)=>{
    let scrap=cheerio.load(data)
    let latestUpdatesScrap=scrap('.update-box');
    let updates=[]
    for(let i=0;i<latestUpdatesScrap.length;i++){
        let newsDate=scrap(latestUpdatesScrap[i])?.children('p')?.children('strong')?.text();
        let newsHeadline=scrap(latestUpdatesScrap[i])?.children('p')?.children('a')?.text();
        let newsLink=scrap(latestUpdatesScrap[i])?.children('p')?.children('a')?.attr('href');
        updates.push({newsDate,newsHeadline,newsLink})
    }

    let siteStats=scrap('.site-stats-count ul li')
    let siteStatsData={}
    siteStatsData.totalVaccinations={}
    siteStatsData.totalVaccinations.heading=scrap('.totalvac').text().split(' :')[0]
    siteStatsData.totalVaccinations.values=scrap('.coviddata').text()
    siteStatsData.totalVaccinations.upValues=scrap('.coviddataval').text().replace(/[{()}]/g, '')
    siteStatsData.date=scrap('.covidupdae').children('span').text()
    siteStatsData.activeCases={}
    siteStatsData.activeCases.heading=scrap(siteStats[0]).children('.mob-show').text()?.split('  ')[0]
    siteStatsData.activeCases.values=scrap(siteStats[0]).children('.mob-show').text()?.split('  ')[1].replace(/[{()}]/g, ' ').split(' ')[0];
    siteStatsData.activeCases.downValues=scrap(siteStats[0]).children('.mob-show').text()?.split('  ')[1].replace(/[{()}]/g, ' ').split(' ')[1];
    
    siteStatsData.discharged={}
    siteStatsData.discharged.heading=scrap(siteStats[1]).children('.mob-show').text()?.split('  ')[0]
    siteStatsData.discharged.values=scrap(siteStats[1]).children('.mob-show').text()?.split('  ')[1].replace(/[{()}]/g, ' ').split(' ')[0];
    siteStatsData.discharged.upValues=scrap(siteStats[1]).children('.mob-show').text()?.split('  ')[1].replace(/[{()}]/g, ' ').split(' ')[1];

    siteStatsData.deaths={}
    siteStatsData.deaths.heading=scrap(siteStats[2]).children('.mob-show').text()?.split('  ')[0]
    siteStatsData.deaths.values=scrap(siteStats[2]).children('.mob-show').text()?.split('  ')[1].replace(/[{()}]/g, ' ').split(' ')[0];
    siteStatsData.deaths.upValues=scrap(siteStats[2]).children('.mob-show').text()?.split('  ')[1].replace(/[{()}]/g, ' ').split(' ')[1];

    siteStatsData.testedYesterday=scrap('.tested').text()
    siteStatsData.technicalDetails={}
    siteStatsData.technicalDetails.text=scrap('.blinking').text()
    siteStatsData.technicalDetails.email=scrap('.blinking').children('strong').children('a').text()
    siteStatsData.technicalDetails.href=scrap('.blinking').children('a').attr('href')
    
    let  resources={}
    let  resourcesTabs=scrap('.tabs-menu').children('li')
    let resourcesTabsData=[]
    for(let i=0;i<resourcesTabs.length;i++){
        let tabmenus=scrap(resourcesTabs[i]).children('a').text()
        let tabmenusId=scrap(resourcesTabs[i]).attr('id')
        let data={}
        data.heading=tabmenus
        data.id=tabmenusId
        data.values=[]
        let panes=scrap('.panes')
        let panesData=scrap(panes[i]).children('.tab-content').children('ul').children('li')
        for(let i=0;i<panesData.length;i++){
            let panesDate=scrap(panesData[i]).children('span').text()
            let panesLink=scrap(panesData[i]).children('a').attr('href')
            let panesText=scrap(panesData[i]).children('a').text()
            data.values.push({
                date:panesDate,
                link:panesLink,
                text:panesText
            })
        }
        resourcesTabsData.push(data)
    }
    resources.tabs=resourcesTabsData

    return {    
                site_stats:siteStatsData,
                news:updates,
                resources:resources       
            }
}

const webscrapHandler= async ()=>{
    const response=await webScrapRepo()
    let scrapper;
    let error;
    if(response.status==200){
        scrapper=scrapperData(response.data)
        return scrapper
    }else{
        error=response
        return error
    }
}
const tableDataJsonApi=()=>{
    return axios({
        url:" https://www.mohfw.gov.in/data/datanew.json",
    }) 
}

const tableDataJson=async ()=>{
    const data=tableDataJsonApi()
        .then((response)=>{
            return response.data
        }).catch((error)=>{
            console.log(error)
    })
    return data
}

app.get('/table-data',async (req, res) => {
        let tableData;
        tableData = await client.get(req.url)
	    if(tableData){
            res.send(tableData)
        }else{
            tableData=await tableDataJson()
            await client.set(req.url, JSON.stringify(tableData), 'EX',120000)
            res.send(tableData);
        } 
    });

app.get('/site-data', async (req, res) => {
    let scappedData
    scappedData = await client.get(req.url)
    if(scappedData){
        res.send(scappedData)
    }else{
        scappedData=await webscrapHandler()
        await client.set(req.url, JSON.stringify(scappedData), 'EX',120000)
        res.send(scappedData);
    } 
});
 
app.listen(PORT,()=>{console.log(`Server is listening on port : ${PORT}`)})
