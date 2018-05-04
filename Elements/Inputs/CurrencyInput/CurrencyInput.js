import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { Container, Caption1, Spacer, AUI_COLORS, AUI_LAYOUT, AUI_TYPOGRAPHY } from '../../../Elements';
import { AUI_FUNCTIONS } from "../../../Helpers";

import { TextInputMask } from 'react-native-masked-text';
import LinearGradient from 'react-native-linear-gradient';

class CurrencyInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      backgroundColor: AUI_COLORS.Silver.getRgba(0.5),
      underline: AUI_COLORS.Iron.hex,
      labelColor: AUI_COLORS.Slate.hex,
    };
  }

  onBlur() {
    this.setState({
      backgroundColor: AUI_COLORS.Silver.getRgba(0.5),
      underline: AUI_COLORS.Iron.hex,
      labelColor: AUI_COLORS.Slate.hex,
    });
  }

  onFocus() {
    this.setState({
      backgroundColor: AUI_COLORS.WalaTeal.tint4,
      underline: AUI_COLORS.WalaTeal.hex,
      labelColor: AUI_COLORS.WalaTeal.hex,
    });
  }

  _amount: ?any;

  _getRawValue() {
    return this._amount.getRawValue();
  }

  render() {
    const { label, options, value, onChangeText, autoFocus, convertedValue } = this.props;

    return (
      <Container>
        <Container actAsRow>
          <Caption1 style={{ height: AUI_FUNCTIONS.gridBaseMultiplier(2), color: this.state.labelColor }}>{label}</Caption1>
          {convertedValue && (
            <Caption1 style={{ height: 26, position: 'absolute', right: 0 }}>
              {convertedValue}
            </Caption1>
          )}
        </Container>
        <Container style={[
            AUI_LAYOUT.roundCorners,
            styles.inputWrapper,
            {backgroundColor: this.state.backgroundColor}
          ]}>
          <LinearGradient
            colors={[AUI_COLORS.ScampiPurple.getRgba(0.15), AUI_COLORS.ScampiPurple.getRgba(0)]}
            style={[
              AUI_LAYOUT.roundTopCorners,
              styles.gradient
            ]}
          />
          <TextInputMask
            ref={amount => (this._amount = amount)}
            autoFocus={autoFocus}
            type={'money'}
            editable={true}
            options={options}
            underlineColorAndroid="transparent"
            placeholderTextColor={AUI_COLORS.Iron.hex}
            selectionColor={AUI_COLORS.WalaTeal.hex}
            caretHidden={true}
            keyboardType={'numeric'}
            onBlur={() => {
              this.onBlur();
            }}
            onFocus={() => {
              this.onFocus();
            }}
            style={[
              styles.input,
              AUI_LAYOUT.roundCorners,
              {
                borderBottomColor: this.state.underline
              },
            ]}
            value={value}
            onChangeText={onChangeText}
          />
        </Container>
        <Spacer />
      </Container>
    );
  }
}

CurrencyInput.defaultProps = {
  autoFocus: false
};

CurrencyInput.propTypes = {
  label: PropTypes.string,
  options: PropTypes.object,
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  onChangeText: PropTypes.func,
  autoFocus: PropTypes.bool
};

const styles = StyleSheet.create({
  inputWrapper: {
    position: 'relative',
    height: AUI_FUNCTIONS.gridBaseMultiplier(4),
    width: '100%'
  },
  input: {
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    fontSize: 26,
    height: AUI_FUNCTIONS.gridBaseMultiplier(4),
    fontFamily: AUI_TYPOGRAPHY.ProximaNova.semibold,
    color: AUI_COLORS.Charcoal.hex,
    textAlign: 'center',
    fontWeight: '400',
    position: 'absolute',
    width: '100%',
    top: 0,
    left: 0,
    zIndex: 5
  },
  gradient: {
    height: 7,
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 4
  }
});

export  {
  CurrencyInput
}