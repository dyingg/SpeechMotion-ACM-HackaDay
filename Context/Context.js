import React, {useState, useEffect} from 'react';

import {Surface} from 'react-native-paper';

import {StyleSheet, ScrollView, View} from 'react-native';

import {Headline} from 'react-native-paper';

import ContextCard from './ContextCard';

const ContextRoute = () => {

  const [topic, uTopic] = useState("Rose");
  
  const [data, uData] = useState([]);

  useEffect( () => {
    (async () => {
      try {
        // resp = await fetch(`https://api.duckduckgo.com/?q=${topic}&format=json&pretty=1`);
        // json = await resp.json();
        // console.log(json);
      }
      catch (e) {
        console.log(e);
      }
    })();
	}, [topic])


  return (
    <Surface style={{flex: 1}}>
      <View style={{paddingTop: 40, paddingLeft: 40}}>
        <Headline style={context.header}>Showing results for {topic} </Headline>
        <ScrollView style={context.contextContainer}>
          <View style={{flexDirection: 'row'}}>
            <ContextCard />
            <ContextCard />
            <ContextCard />
          </View>
          <View style={{flexDirection: 'row'}}>
            <ContextCard />
            <ContextCard />
            <ContextCard />
          </View>

          <View style={{flexDirection: 'row'}}>
            <ContextCard />
            <ContextCard />
            <ContextCard />
          </View>
        </ScrollView>
      </View>
    </Surface>
  );
};

const context = StyleSheet.create({
  header: {
    marginBottom: 10,
    fontWeight: '700',
  },
  cardTitle: {
    marginBottom: 10,
  },
  cardStyle: {},
  contextContainer: {
    marginBottom: 50,
  },
});

export default ContextRoute;
