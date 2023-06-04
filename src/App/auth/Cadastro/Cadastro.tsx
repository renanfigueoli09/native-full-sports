import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
import { Image, ScrollView, Text, TextInput, View } from "react-native";
import { CadastroUsuarioStyles as style } from "./Cadastro-styles";
import { GlobalStyles as global } from "../../../../styles-global";
import { GlobalColors } from "../../../shared/utils/styles/global-colors";
import { ButtonGreen } from "../../../shared/components/Buttons/default-Buttons";
import { TouchableOpacity } from "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import ApiCep from "../../../environment/cep-api";
import { cpfMask, maskDate } from "../../../shared/utils/functions/masks";
import {
  isNumeric,
  validateEmail,
  validateInputs,
} from "../../../shared/utils/functions/validate-inputs";
import { ICadastroUsuario } from "../../../shared/utils/models/interface-cadastro";
import { MaskedTextInput } from "react-native-mask-text";
import SelectDropdown from "react-native-select-dropdown";
import { UFS } from "../../../shared/utils/data/regioes-br";
import { Button } from "react-native-paper";

const fullSportsLogo = require("./../../assets/illustrations/full-sports-logo.png");

export const CadastroUsuario = ({ navigation }) => {
  const [nome, setNome] = useState<string>();
  const [cpf, setCpf] = useState<string>("");
  const [dataNasc, setDataNasc] = useState<string>();
  const [cep, setCep] = useState<string>();
  const [rua, setRua] = useState<string>();
  const [bairro, setBairro] = useState<string>();
  const [estado, setEstado] = useState<string>("CE");
  const [cidade, setCidade] = useState<string>();
  const [numero, setNumero] = useState<string>();
  const [complemento, setComplemento] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [senha, setSenha] = useState<string>();
  const [showPass, setShowPass] = useState<boolean>();
  const [criarContaButton, setCriarContaButton] = useState<boolean>(false);
  const [carregandoCepMenssagem, setCarregandoCepMessagem] = useState(false);
  const [carregandoCep, setCarregandoCep] = useState(false);
  // let query: ICadastroUsuario = {
  //   nome: nome,
  //   data_nasc: dataNasc,
  //   cpf: cpf,
  //   cep: cep,
  //   rua: rua,
  //   bairro: bairro,
  //   estado: estado,
  //   cidade: cidade,
  //   numero: numero,
  //   complemento: complemento,
  //   email: email,
  //   senha: senha,
  // };

  function buscaCep() {
    setCarregandoCepMessagem(false);
    if (cep === '') {
      setRua('');
      setBairro('');
      setEstado('');
      setCidade('');
    } else {
      ApiCep.request({
        method: 'GET',
        url: cep,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      })
        .then((evento) => {
          setCarregandoCep(false);
          setRua(evento.data.street);
          setBairro(evento.data.neighborhood);
          setEstado(evento.data.state);
          setCidade(evento.data.city);
        })
        .catch((err) => {
          setCarregandoCep(false);
          setCarregandoCepMessagem(true);
          console.log(err);
        });
    }
  }
  return (
    <ScrollView style={global.screenContainer}>
      <Image source={fullSportsLogo} style={style.logo_header} />
      <View style={style.form_row_1}>
        <View style={style.form_item_row}>
          <Text style={style.form_label}>
            Nome <Text style={style.required_symbol}>*</Text>
          </Text>
          <TextInput
            value={nome}
            onChangeText={(e) => setNome(e)}
            placeholderTextColor={GlobalColors.input_placeholder}
            placeholder="Informe seu nome completo"
            style={global.form_input_text}
          />
        </View>
      </View>
      <View style={style.form_row_2}>
        <View style={style.form_item_row_2}>
          <Text style={style.form_label}>
            CPF (somente números) <Text style={style.required_symbol}>*</Text>
          </Text>
          <MaskedTextInput
            mask="999.999.999-99"
            value={cpf}
            onChangeText={(e) => {
              setCpf(e);
              console.log(cpf);
            }}
            placeholderTextColor={GlobalColors.input_placeholder}
            placeholder="000.000.000-00"
            style={global.form_input_text}
            keyboardType="numeric"
          />
          {/* <TextInput
            value={cpf}
            onChangeText={setCpf}
            // onChange={(e) => maskDate(e.target)}
            placeholderTextColor={GlobalColors.input_placeholder}
            placeholder="dd/mm/aaaa"
            style={global.form_input_text}
          /> */}
        </View>
        <View style={style.form_item_row_2}>
          <Text style={style.form_label}>
            Data de nascimento <Text style={style.required_symbol}>*</Text>
          </Text>
          <MaskedTextInput
            mask="99/99/9999"
            value={dataNasc}
            onChangeText={(e) => {
              setDataNasc(e);
            }}
            placeholderTextColor={GlobalColors.input_placeholder}
            placeholder="dd/mm/aaaa"
            style={global.form_input_text}
            keyboardType="numeric"
          />
          {/* <TextInput
            value={dataNasc}
            onChangeText={setDataNasc}
            // onChange={(e) => maskDate(e.target)}
            placeholderTextColor={GlobalColors.input_placeholder}
            placeholder="dd/mm/aaaa"
            style={global.form_input_text}
          /> */}
        </View>
      </View>
      <View style={style.form_row_2}>
        <View style={style.form_item_row_2}>
          <Text style={style.form_label}>
            CEP (somente números) <Text style={style.required_symbol}>*</Text>
          </Text>
          <MaskedTextInput
            mask="99999-999"
            value={cep}
            onChangeText={(e) => {
              setCep(e);
              console.log(e);
            }}
            maxLength={9}
            placeholderTextColor={GlobalColors.input_placeholder}
            placeholder="00000-000"
            style={global.form_input_text}
            keyboardType="numeric"
          />
          {/* <TextInput
            value={cep}
            onChangeText={setCep}
            keyboardType="numeric"
            maxLength={8}
            // onChange={(e) => maskCep(e.target)}
            onBlur={(e) => buscaEndereco(e.target)}
            placeholderTextColor={GlobalColors.input_placeholder}
            placeholder="00000-000"
            style={global.form_input_text}
          /> */}
        </View>
        <View style={style.form_item_row_2}>
          <Text style={style.form_label}>
            Rua <Text style={style.required_symbol}>*</Text>
          </Text>
          <TextInput
            value={rua}
            onChangeText={setRua}
            placeholderTextColor={GlobalColors.input_placeholder}
            placeholder="Ex.: Rua Alegria"
            style={global.form_input_text}
          />
        </View>
      </View>
      <View style={style.form_row_2}>
        <View style={style.form_item_row_2}>
          <Text style={style.form_label}>
            Bairro <Text style={style.required_symbol}>*</Text>
          </Text>
          <TextInput
            value={bairro}
            onChangeText={setBairro}
            placeholderTextColor={GlobalColors.input_placeholder}
            placeholder="Ex.: Bairro Felicidade"
            style={global.form_input_text}
          />
        </View>
        <View style={style.form_item_row_2}>
          <Text style={style.form_label}>
            Estado <Text style={style.required_symbol}>*</Text>
          </Text>
          <SelectDropdown
            data={UFS}
            buttonTextStyle={{
              fontSize: 14,
              color: GlobalColors.input_placeholder,
              textAlign: "left",
            }}
            defaultButtonText="Selecione seu estado"
            buttonStyle={{
              borderBottomWidth: 2,
              borderBottomColor: GlobalColors.neon_green,
            }}
            buttonTextAfterSelection={(selected, idx) => {
              setEstado(selected.sigla);
              return selected.sigla;
            }}
            rowTextForSelection={(selected, idx) => {
              return selected.sigla;
            }}
            onSelect={(item, idx) => {
              return item.sigla;
            }}
          />
          {/* <TextInput
            value={estado}
            onChangeText={setEstado}
            placeholderTextColor={GlobalColors.input_placeholder}
            placeholder="Ex.: SP"
            style={global.form_input_text}
          /> */}
        </View>
      </View>
      <View style={style.form_row_2}>
        <View style={style.form_item_row_2}>
          <Text style={style.form_label}>
            Cidade <Text style={style.required_symbol}>*</Text>
          </Text>
          <TextInput
            value={cidade}
            onChangeText={setCidade}
            placeholderTextColor={GlobalColors.input_placeholder}
            placeholder="Ex.: São Paulo"
            style={global.form_input_text}
          />
        </View>
        <View style={style.form_item_row_2}>
          <Text style={style.form_label}>
            Número <Text style={style.required_symbol}>*</Text>
          </Text>
          <TextInput
            value={numero}
            onChangeText={setNumero}
            keyboardType="numeric"
            placeholderTextColor={GlobalColors.input_placeholder}
            placeholder="Ex.: 190"
            style={global.form_input_text}
          />
        </View>
      </View>
      <View style={style.form_row_1}>
        <View style={style.form_item_row}>
          <Text style={style.form_label}>Complemento</Text>
          <TextInput
            value={complemento}
            onChangeText={setComplemento}
            placeholderTextColor={GlobalColors.input_placeholder}
            placeholder="Complemento do endereço"
            style={global.form_input_text}
          />
        </View>
      </View>
      <View style={style.form_row_1}>
        <View style={style.form_item_row}>
          <Text style={style.form_label}>
            E-mail <Text style={style.required_symbol}>*</Text>
          </Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholderTextColor={GlobalColors.input_placeholder}
            placeholder="Insira seu e-mail"
            style={global.form_input_text}
            keyboardType="email-address"
          />
        </View>
      </View>
      <View style={style.form_row_1}>
        <View style={style.form_item_row}>
          <Text style={style.form_label}>
            Senha <Text style={style.required_symbol}>*</Text>
          </Text>
          <View style={style.input_with_btn}>
            <TextInput
              value={senha}
              onChangeText={setSenha}
              secureTextEntry={showPass ? true : false}
              placeholderTextColor={GlobalColors.input_placeholder}
              placeholder="Insira sua senha"
              style={[
                global.form_input_text,
                { width: "90%", borderBottomWidth: 0 },
              ]}
            />
            <TouchableOpacity
              style={style.input_btn}
            >
              <Icon name={!showPass ? "eye" : "eye-off"} size={18} onPress={() => setShowPass(!showPass)} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={style.form_row_1}>
        <Button
          onPress={() => console.log("TRESTas")}
          icon="account"
          style={[
            {
              width: "100%",
              height: 50,
              borderRadius: 5,
              justifyContent: "center",
              backgroundColor: GlobalColors.neon_green,
            },

          ]}
          textColor={GlobalColors.white}
          disabled={!validateInputs(nome) ||
            !validateInputs(cpf) ||
            !validateInputs(cep) ||
            !validateInputs(rua) ||
            !validateInputs(bairro) ||
            !validateInputs(estado) ||
            !validateInputs(cidade) ||
            !validateInputs(numero) ||
            !validateInputs(complemento) ||
            !validateInputs(email) ||
            !validateInputs(senha)}
        >
          Criar Conta
        </Button>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={style.has_account_link}>Já tem uma conta?</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};
