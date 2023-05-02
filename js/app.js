    let multi = 100/96;

        const datosPorFecha = async (arregloPorTd) => {

            const arreglo = arregloPorTd.split('<td');            
            const fecha = arreglo[1];
            console.log(fecha.substring(13, 24))    

            let TFA = 0;
            let TFM = 0;
            let TFU = 0;

            for(let i=0; i<arreglo.length; i++){
            
                if(arreglo[i].substring(8, 11) == "TFA"){
                    TFA++;
                }else if(arreglo[i].substring(8, 11) == "TFM"){
                    TFM++;
                }else if(arreglo[i].substring(8, 11) == "TFU"){
                    TFU++;
                }
                
            }

           console.log("Disponible: ", TFA, "%"+TFA*multi.toFixed(2),  "No disponible" , TFM, "%"+TFM*multi.toFixed(2),  "Desconocido", TFU ,"%"+TFU*multi.toFixed(2) )
        }


        
        const arregloEstaciones = async (codigo) => {
            console.log(codigo)

            try {
                const datos = await fetch(`https://redgeodesica-sbc.igac.gov.co/Xpos/API/qualityChecks/files/web/EN/${codigo}_availability.htm`);
                const res = await datos.text();
                const arregloPorFecha = res.split('<tr>');
                //console.log(arregloPorFecha)
                //const arregloPorTd = arregloPorFecha[3].split('<td');
                //const fecha = arregloPorFecha[1].split('<td');
                for(let i=3; i<arregloPorFecha.length; i++){                                
                    datosPorFecha(arregloPorFecha[i]);
                }
                
            } catch (error) {
                console.log(error)
            }



        }

        

        (async () => {
            let mensaje = "";
            
            try {
                const datos = await fetch('https://redgeodesica-sbc.igac.gov.co/Xpos/API/qualityChecks/files/web/EN/index.htm');
                const res = await datos.text();
                const arregloEstaciones = res.split('<tr>');

                for(let i=3; i<arregloEstaciones.length ; i++){   
                    
                    //console.log(arregloEstaciones[i].split('<td')[7])
                    // console.log(arregloEstaciones[i].split('<td')[7].substring(24, 28))  codigo
                    // console.log(arregloEstaciones[i].split('<td')[7].substring(48, 52))  nombre
                    mensaje += `<li class="list-group-item" onclick="arregloEstaciones(${arregloEstaciones[i].split('<td')[7].substring(24, 28)})">
                        ${arregloEstaciones[i].split('<td')[7].substring(24, 28)} -
                        ${arregloEstaciones[i].split('<td')[7].substring(48, 52)}
    
                    </li>`;            
                }    
            } catch (error) {
                console.log(error)
            }
            
            
            //console.log(arregloEstaciones[3])
            document.querySelector('.list-group').innerHTML = mensaje;

        })();