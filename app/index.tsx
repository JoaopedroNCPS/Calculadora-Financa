import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#efefef",
    padding: 20,
  },
  title: {
    fontSize: 26,
    color: "#AA2200",
    fontWeight: "bold",
  },
  input: {
    width: "80%",
    borderColor: "#000",
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
    marginBottom: 10,
  },
  result: {
    fontSize: 18,
    color: "#222",
    marginTop: 10,
    textAlign: "center"
  }
});

export default function App() {
  const [valor, setValor] = useState("");
  const [parcelas, setParcelas] = useState("");
  const [juros, setJuros] = useState("");
  const [taxas, setTaxas] = useState("");
  const [resultado, setResultado] = useState("");

  const calcularFinanciamento = () => {
    const c = parseFloat(valor.replace(",", "."));
    const t = parseInt(parcelas);
    const i = parseFloat(juros.replace(",", ".")) / 100;
    const tx = parseFloat(taxas.replace(",", "."));

    if (isNaN(c) || isNaN(t) || isNaN(i)) {
      setResultado("Preencha todos os campos corretamente.");
      return;
    }

    const montante = c * Math.pow(1 + i, t) + tx;
    const parcela = montante / t;

    setResultado(`Montante total: R$ ${montante.toFixed(2)}\nValor da parcela: R$ ${parcela.toFixed(2)}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Simulador de Financiamento</Text>

      <TextInput
        placeholder="Valor do bem (R$)"
        style={styles.input}
        keyboardType="numeric"
        value={valor}
        onChangeText={setValor}
      />
      <TextInput
        placeholder="Número de parcelas"
        style={styles.input}
        keyboardType="numeric"
        value={parcelas}
        onChangeText={setParcelas}
      />
      <TextInput
        placeholder="Taxa de juros mensal (%)"
        style={styles.input}
        keyboardType="numeric"
        value={juros}
        onChangeText={setJuros}
      />
      <TextInput
        placeholder="Taxas adicionais (R$)"
        style={styles.input}
        keyboardType="numeric"
        value={taxas}
        onChangeText={setTaxas}
      />

      <Button title="Calcular" onPress={calcularFinanciamento} />

      {resultado !== "" && <Text style={styles.result}>{resultado}</Text>}
    </View>
  );
}
