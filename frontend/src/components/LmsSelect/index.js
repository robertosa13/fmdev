import React, { Component, Fragment } from 'react';

import { Card, CardContainer, Image, DialogForm } from './styles';

import { Creators as DialogActions } from '../../store/ducks/dialog';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import moodle from '../../assets/moodle.svg';
import chamilo from '../../assets/chamilo.svg';
import open_edx from '../../assets/open_edx.svg';
import totara_learn from '../../assets/totara_learn.svg';

import Dialog from '../Dialog';
import Button from '../../styles/Button';
import { ConfigContainer } from '../../styles/ConfigContainer';

class LmsSelect extends Component {

  state = {
    url: null,
    api_key: null
  }

  submit() {
    const { setDialog } = this.props;
    // const { lms } = this.props.workflow;

    setDialog('moodle');
  }

  handleChangeInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  renderMoodleDialog() {
    const { setDialog } = this.props;

    return (
      <Dialog size="big">
        <DialogForm>
          <h1>Criar conexão</h1>

          <span>URL</span>
          <input onChange={this.handleChangeInput} name="url" />

          <span>Chave de Api</span>
          <input nChange={this.handleChangeInput} name="api_key" />

          <Button onClick={this.submit.bind(this)}>Salvar</Button>
          <Button size="small" color="gray" onClick={setDialog('moodle')}>Cancelar</Button>
        </DialogForm>
      </Dialog>
    )
  }

  render() {
    const { dialog, setDialog } = this.props;

    return (
      <Fragment>
        <ConfigContainer>
          <h1>Escolha o LMS que você vai trabalhar</h1>
          <CardContainer>
            <Card onClick={setDialog.bind(this, 'moodle')}>
              <Image alt="" src={moodle} />
              <span>Última versão: 7.0.1</span>
            </Card>
            <Card>
              <Image alt="" disabled src={chamilo} />
              <span>Última versão: 7.0.1</span>
            </Card>
            <Card>
              <Image alt="" disabled src={open_edx} />
              <span>Última versão: 7.0.1</span>
            </Card>
            <Card>
              <Image alt="" disabled src={totara_learn} />
              <span>Última versão: 7.0.1</span>
            </Card>
          </CardContainer>
        </ConfigContainer>
        {dialog.moodle ? this.renderMoodleDialog() : null}
      </Fragment>
    );
  }
}

const mapStateToProps = ({ workflow }) => ({ workflow });

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(DialogActions, dispatch);

export default connect(
  mapStateToProps, mapDispatchToProps
)(LmsSelect);