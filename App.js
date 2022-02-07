
import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView, TextComponent,
   Keyboard,
   ActivityIndicator,
   KeyboardAvoidingView
   } from 'react-native';

export default function App() {

  const [cep, setCep] = useState('');
  const [infos, setInfos] = useState(null);
  const[loading,setLoading] = useState(false);
  const inputRef = useRef(null);

  function limpar() {

    setCep("")
    inputRef.current.focus();
    setInfos(null)


  }

  async function buscar() {
    setLoading(true)
    if (cep == '') {
      alert('digite um cep valido');
      setCep('');
      return;
    }
try{
    await fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then(cepHttp => cepHttp.json())
      .then(cepHttp => setInfos(cepHttp))
}catch(error){
  console.log('ERROR:'+error);
  alert("Ocorreu um erro com sua busca, digite novamente o CEP");
}

    Keyboard.dismiss();
    setLoading(false)



  }


  return (
    <SafeAreaView style={styles.container}>

      <Text style={styles.txtCabecalho}> DIGITE O SEU CEP  </Text>
      <View style={styles.areaInput}>
        <Text style={{ fontSize: 20 }}> CEP : </Text>
        <TextInput
          value={cep}
          style={styles.input}
          placeholder="Exemplo 03477010 "
          keyboardType="numeric"
          onChangeText={(texto) => setCep(texto)}
          ref={inputRef}
         

          





        />


      </View>

      <View style={styles.areaBotao}>

        <TouchableOpacity 
        onPress ={buscar}
        style={[styles.btn, { backgroundColor: '#98FB98' }]}>

          <Text style={styles.txtBtn}>BUSCAR</Text>

        </TouchableOpacity>


        <TouchableOpacity style={[styles.btn, { backgroundColor: '#FA8072' }]} onPress={limpar}>

          <Text style={styles.txtBtn}>LIMPAR</Text>

        </TouchableOpacity>

       

      </View>

      {loading?<ActivityIndicator color="#000" size={40} />:<Text></Text>}


      {infos &&
      <View style={styles.areaResposta}>


        <Text style={styles.txtResposta}>CEP: {infos.cep} </Text>
        <Text style={styles.txtResposta}>Logradouro: {infos.logradouro} </Text>
        <Text style={styles.txtResposta}>Bairro: {infos.bairro}</Text>
        <Text style={styles.txtResposta}>Cidade: {infos.localidade} </Text>
        <Text style={styles.txtResposta}>Estado: {infos.uf} </Text>



      </View>

      }


    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 30

  },
  txtCabecalho: {
    fontSize: 25,
    fontWeight: 'bold'

  },
  areaInput: {

    flexDirection: "row",
    marginTop: 40,
    alignItems: 'center'

  },
  input: {
    borderWidth: 0.5,
    fontSize: 18,
    borderColor: '#222222',
    marginLeft: 7,
    padding: 5,
    width: 300,
    borderRadius: 5,
    textAlign: 'center'


  },
  areaBotao: {

    flexDirection: 'row',
    marginTop: 60,
    alignItems: "center"

  },
  btn: {

    padding: 12,
    borderRadius: 10,
    marginHorizontal: 30


  },
  txtBtn: {
    color: "#FFFF",
    fontWeight: "bold",
    fontSize: 20,



  },
  areaResposta: {

    flex: 1,
    marginTop: 40,
    backgroundColor: '#FAEBD7',
    borderRadius: 30,
    width: 350,
    marginBottom: 40,
    alignItems: "flex-start",
    justifyContent: "center"



  },
  txtResposta: {
    fontSize: 22,
    marginLeft: 10,
    marginBottom: 10


  }

});
