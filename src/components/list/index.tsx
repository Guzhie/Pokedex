import React from 'react';
import { FlatList, useWindowDimensions, View } from 'react-native';

interface ListProps {
  data: any[];
  onLoadMore: () => void;
  renderItemContent: (item: any) => React.ReactNode;
  minColumnWidth?: number;
}

export function List({
  data,
  onLoadMore,
  renderItemContent,
  minColumnWidth = 200,
}: ListProps) {
  const { width } = useWindowDimensions();
  const numColumns = Math.max(1, Math.floor(width / minColumnWidth));

  return (
    <FlatList
      key={numColumns} // força remount quando colunas mudam
      style={{ flex: 1 }}
      contentContainerStyle={{ gap: 8, padding: 4 }}
      data={data}
      numColumns={numColumns}
      columnWrapperStyle={numColumns > 1 ? { gap: 8 } : undefined}
      keyExtractor={(item) => String(item.id)}
      renderItem={({ item }) => (
        <View style={{ flex: 1 }}>
          {renderItemContent(item)}
        </View>
      )}
      onEndReached={onLoadMore}
      onEndReachedThreshold={0.2}
    />
  );
}