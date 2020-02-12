import React from 'react';


import {
	Title,
	Card,
	Button,
	TouchableRipple,
	Paragraph,
  } from 'react-native-paper';



const ContextCard = (props) => {
	return (
	  <Card style={{flex: 1, marginRight: 10, marginBottom: 20}} elevation={2}>
		<Card.Cover
		  style={{height: 150}}
		  source={{uri: 'https://picsum.photos/700'}}
		/>
		<Card.Content>
		  <Paragraph>Hello</Paragraph>
		</Card.Content>
  
		<Card.Actions>
		  <TouchableRipple
			onPress={() => {}}
			rippleColor="rgba(0, 0, 0, .32)">
			<Button color={"#1e88e5"}>
			  View More
			</Button>
		  </TouchableRipple>
		</Card.Actions>
	  </Card>
	);
};
  
export default ContextCard;