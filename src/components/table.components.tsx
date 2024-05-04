/**
 * Created by Jeepeng on 2016/11/20.
 */
/**
 *
 * Customize react-native-simple-table by Hungnv
 */

import React from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import colors from 'constants/colors';

const DEFAULT_HEIGHT = 240;
const DEFAULT_COLUMN_WIDTH = 60;

const Table = (props: any) => {
  const _renderCell = (cellData: any, col: any, index: number) => {
    const { dataIndex } = col;

    let style = { width: col.width || props.columnWidth || DEFAULT_COLUMN_WIDTH };
    let cellStart = {};
    let cellEnd = { borderRightWidth: 0, paddingLeft: 0 };

    return (
      <View key={dataIndex} style={[styles.cell, style, index % 2 == 0 ? cellStart : cellEnd]}>
        {col.render ? col.render(cellData) : <Text>{cellData}</Text>}
      </View>
    );
  };

  const _renderHeader = () => {
    let { columns, columnWidth } = props;
    let cellStart = {};
    let cellEnd = { borderRightWidth: 0, alignItems: 'center' };

    return columns.map((col: any, index: number) => {
      let style = { width: col.width || columnWidth || DEFAULT_COLUMN_WIDTH };
      return (
        <View key={index} style={[styles.headerItem, style, index % 2 == 0 ? cellStart : cellEnd]}>
          <Text style={styles.textHeader}>{col.title}</Text>
        </View>
      );
    });
  };

  const _renderRow = (rowData: any, index: number) => {
    let { columns } = props;
    return (
      <View key={index} style={[styles.row, index % 2 ? { backgroundColor: colors.whiteSmoke } : {}]}>
        {columns.map((col: any, columnIndex: number) => _renderCell(rowData[col.dataIndex], col, columnIndex))}
      </View>
    );
  };

  let { dataSource, style, height } = props;

  return (
    <ScrollView
      style={[styles.container]}
      contentContainerStyle={[styles.contentContainer, { height }, style]}
      horizontal={true}
      bounces={false}
    >
      <View>
        <View style={styles.header}>{_renderHeader()}</View>
        <ScrollView style={styles.dataView} contentContainerStyle={styles.dataViewContent}>
          {dataSource.map((rowData: any, index: number) => _renderRow(rowData, index))}
        </ScrollView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {},
  contentContainer: {
    height: 240,
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#EEBEBF',
    borderTopEndRadius: 5,
    borderTopStartRadius: 5,
  },
  textHeader: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  headerItem: {
    minHeight: 30,
    width: DEFAULT_COLUMN_WIDTH,
    borderRightWidth: 1,
    borderRightColor: '#dfdfdf',
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: 10,
    paddingLeft: 15,
  },
  dataView: {
    flexGrow: 1,
  },
  dataViewContent: {},
  row: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    height: 'auto',
  },
  cell: {
    width: DEFAULT_COLUMN_WIDTH,
    backgroundColor: 'transparent',
    borderRightWidth: 1,
    borderRightColor: '#dfdfdf',
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: 10,
    paddingLeft: 15,
  },
});

export default Table;
