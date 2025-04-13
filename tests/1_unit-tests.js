const chai = require("chai");
let assert = chai.assert;
const ConvertHandler = require("../controllers/convertHandler.js");

let convertHandler = new ConvertHandler();

suite("Unit Tests", function () {
  // Número válido: entero
  test("convertHandler should correctly read a whole number input", () => {
    assert.strictEqual(convertHandler.getNum("2kg"), 2);
  });

  // Número válido: decimal
  test("convertHandler should correctly read a decimal number input", () => {
    assert.strictEqual(convertHandler.getNum("2.5lbs"), 2.5);
  });

  // Número válido: fracción
  test("convertHandler should correctly read a fractional input", () => {
    assert.strictEqual(convertHandler.getNum("1/5kg"), 0.2);
  });

  // Número válido: fracción con decimal
  test("convertHandler should correctly read a fractional input with a decimal", () => {
    assert.strictEqual(convertHandler.getNum("0.2/0.5kg"), 0.4);
  });

  // Número inválido: doble fracción
  test("convertHandler should correctly return an error on a double-fraction", () => {
    assert.strictEqual(convertHandler.getNum("2/2/7kg"), "invalid number");
  });

  // Número omitido: default 1
  test("convertHandler should correctly default to a numerical input of 1 when no numerical input is provided", () => {
    assert.strictEqual(convertHandler.getNum("lbs"), 1);
  });

  // Unidades válidas
  test("convertHandler should correctly read each valid input unit", () => {
    const validUnits = ["gal", "L", "mi", "km", "lbs", "kg"];
    validUnits.forEach((unit) => {
      assert.strictEqual(convertHandler.getUnit("3" + unit), unit);
    });
  });

  // Unidad inválida
  test("convertHandler should correctly return an error for an invalid input unit", () => {
    assert.strictEqual(convertHandler.getUnit("2invalidUnit"), "invalid unit");
  });

  // Retorno de unidad correspondiente
  test("convertHandler should return the correct return unit for each valid input unit", () => {
    const inputUnits = ["gal", "L", "mi", "km", "lbs", "kg"];
    const expectedReturnUnits = ["L", "gal", "km", "mi", "kg", "lbs"];
    inputUnits.forEach((unit, i) => {
      assert.strictEqual(convertHandler.getReturnUnit(unit), expectedReturnUnits[i]);
    });
  });

  // Nombre completo de unidad
  test("convertHandler should correctly return the spelled-out string unit for each valid input unit", () => {
    const inputUnits = ["gal", "L", "mi", "km", "lbs", "kg"];
    const expectedSpelled = ["gal", "L", "mi", "km", "lbs", "kg"];
    inputUnits.forEach((unit, i) => {
      assert.strictEqual(convertHandler.spellOutUnit(unit), expectedSpelled[i]);
    });
  });

  // Conversión gal -> L
  test("convertHandler should correctly convert gal to L", () => {
    assert.approximately(convertHandler.convert(2, "gal"), 7.57082, 0.1);
  });

  // Conversión L -> gal
  test("convertHandler should correctly convert L to gal", () => {
    assert.approximately(convertHandler.convert(2, "L"), 0.52834, 0.1);
  });

  // Conversión mi -> km
  test("convertHandler should correctly convert mi to km", () => {
    assert.approximately(convertHandler.convert(2, "mi"), 3.21868, 0.1);
  });

  // Conversión km -> mi
  test("convertHandler should correctly convert km to mi", () => {
    assert.approximately(convertHandler.convert(2, "km"), 1.24275, 0.1);
  });

  // Conversión lbs -> kg
  test("convertHandler should correctly convert lbs to kg", () => {
    assert.approximately(convertHandler.convert(2, "lbs"), 0.90718, 0.1);
  });

  // Conversión kg -> lbs
  test("convertHandler should correctly convert kg to lbs", () => {
    assert.approximately(convertHandler.convert(2, "kg"), 4.40925, 0.1);
  });
});
