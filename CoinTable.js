import { Container, createTheme, makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, ThemeProvider, Typography } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { CoinList } from '../config/api';
import { CryptoState } from '../CryptoContext';


export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

const CoinTable = () => {

    
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const history = useHistory();

const { currency,symbol,coins,loading,fetchCoins } = CryptoState()    

   

    console.log(coins);

    useEffect (()=>{
         fetchCoins();
    },[currency])

    const darkTheme = createTheme({
        palette:{
            primary: {
                main:"#fff",
            },
            type: "dark",
        },
    });
     const handleSearch =()=>{
         return coins.filter((coin)=>
             coin.name.toLowerCase().includes(search)||
             coin.symbol.toLowerCase().includes(search)
         )
     };


     const useStyles = makeStyles(()=>({
         row:{
             backgroundColor:"#16171a",
             cursor:"pointer",
             "&:hover":{
                 backgroundColor:"#131111",
             },
             fontFamily:"Montserrat",
         },
         pagination: {
            "& .MuiPaginationItem-root": {
              color: "white",
             },
         },
     }))

     const classes = useStyles()
  return (
    <ThemeProvider theme={darkTheme}>
    <Container styel={{textAlign: "center"}}>
    <Typography
          variant="h4"
          style={{ margin: 18, fontFamily: "Montserrat", textAlign:"center" }}
        >
          Cryptocurrency Prices by Market Cap
    </Typography>

    <TextField  label="Search For a Crypto Currency.."
          variant="outlined" style={{ marginBottom: 20, width: "100%" }}
          onChange={(e) => setSearch(e.target.value)}
          />
          
    <TableContainer>
            {/* <div>
                {loading}
            </div> */}
    <Table>
    <TableHead style={{ backgroundColor: "white" }}>
    <TableRow>
    {["Coin", "Price", "24h Change", "Market Cap"].map((head)=>(
        <TableCell 
            style={{
          color: "black",
          fontWeight:"700",
          fontFamily: "Montserrat",
      }}
                                    key={head}
                                    align={head === "Coin" ? "" : "right"}
                                    >
                                    {head}
                                   </TableCell>
                               )
                               )}
                           </TableRow>
                        </TableHead>
                        <TableBody>
                          {handleSearch()
                          .slice((page-1)*10,(page-1)*10+10)
                          .map((row)=>{
                             const profit=row.price_change_percentage_24h > 0;

                             return(
                                <TableRow
                                onClick={() => history.push(`/coins/${row.id}`)}
                                className={classes.row}
                                key={row.name}
                              >
                                    <TableCell 
                                    component="th"
                                    scope="row"
                                    style={{
                                        display:"flex",
                                        gap: 15,
                                    }}
                                    >
                                       <img
                                         src={row?.image}
                                         alt={row.name}
                                         height="50"
                                         style={{marginBotton:10}}
     />

     <div style={{ display:"flex", flexDirection:"column"}}>
    <span style={{textTransform:"uppercase", fontSize:22,}}>
    {row.symbol}
    </span>
    <span style={{color:"darkgrey"}}>{row.name}</span>
     </div>
       </TableCell>
       <TableCell
       align='right'
       >
          {symbol}{" "} 
          {numberWithCommas(row.current_price.toFixed(2))}

       </TableCell>
         <TableCell
    align='right'
    style={{
        color:profit>0?"rgb(14,203,129)" : "red",
        fontWeight:500,
    }}
    >
     {profit && '+'}
     {row.price_change_percentage_24h.toFixed(2)}%   
        
        </TableCell>  

    <TableCell
    align='right'
    >
      {symbol}{" "}
      {numberWithCommas(row.market_cap.toString().slice(0, -6))}  
         M
    </TableCell>                                

                </TableRow>
                 )
                })}
                </TableBody>
            </Table>
        </TableContainer>
        <Pagination
        style={{
            padding:20,
            width:"100%",
            display:"flex",
            justifyContent:"center",
        }}
        classes={{ul: classes.pagination}}
        count={(handleSearch()?.length/10).toFixed(0)}
        onChange={(_, value)=>{
            setPage(value);
            window.scroll(0,450);
        }}
        >
           
        </Pagination>
      </Container>
    </ThemeProvider>
  )
}

export default CoinTable