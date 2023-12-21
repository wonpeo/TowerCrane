import React, { useState, useEffect } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import {inputMessage,getMessageList, getMessageRecord} from '../../../apis';
import Card from '@mui/material/Card';
type MessageData = {
    id: string;
    messageContents: string;
    messageTitle: string;
    senderId: string;
    receiverId: string;
    recordTime: string; 
};

const SendMessage = () => {
    const loggedInUserId = localStorage.getItem('jsid') || '';

    const [messages, setMessages] = useState<MessageData[]>([]); 
    const [receiverId, setReceiverId] = useState<string>('');
    const [newMessageData, setNewMessageData] = useState<MessageData>({ 
        id: '',
        messageContents: '',
        messageTitle: '',
        senderId: loggedInUserId, 
        receiverId: '',
        recordTime: ''
    });

    const fetchMessages = async () => {
        try {
            console.log('Logged in user ID:', loggedInUserId);
            const [sentMessages, receivedMessages] = await Promise.all([
                getMessageRecord(loggedInUserId),
                getMessageList(receiverId)  
            ]);
            console.log('Sent messages:', sentMessages, 'Received messages:', receivedMessages); 
    
            if (sentMessages.status === 'Success' && receivedMessages.status === 'Success') {
                console.log('Sent messages data:', sentMessages.data, 'Received messages data:', receivedMessages.data);
                const combinedMessages = [...sentMessages.data, ...receivedMessages.data];
                combinedMessages.sort((a, b) => new Date(a.recordTime).getTime() - new Date(b.recordTime).getTime());
                console.log('Combined messages:', combinedMessages);  
                setMessages([...combinedMessages]);
            } else {
                console.error('Error: ', sentMessages.message || receivedMessages.message);
            }
        } catch (err) {
            console.error(err);
        }
    };    
        
    useEffect(() => {
        console.log('Messages state:', messages);
    }, [messages]);

    const [checked, setChecked] = useState<boolean>(false);

    const handleCheck = async () => {
        if (!receiverId) {
            alert('받는 사람 ID를 입력해주세요.');
            return;
        }
        
        setChecked(true);
    };
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewMessageData({
            ...newMessageData,
            [e.target.name]: e.target.value
        });
    };

    const handleReceiverIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setReceiverId(e.target.value);
    };

    useEffect(() => {
        if(receiverId) {
            fetchMessages();
        }
    }, [receiverId]);

    const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        if(newMessageData.messageContents.trim() !== "") {
            try {
                await inputMessage({
                    senderId: newMessageData.senderId,
                    receiverId: receiverId,
                    messageTitle: newMessageData.messageTitle,
                    messageContents: newMessageData.messageContents,
                }); 
                alert('메시지가 성공적으로 전송되었습니다.');
    
                setNewMessageData({
                    id: '',
                    messageContents: '',
                    messageTitle: '',
                    senderId: loggedInUserId,
                    receiverId: receiverId,
                    recordTime: ''
                });
    
                await fetchMessages();
    
            } catch(err) {
                console.error(err);
                alert('메시지를 보내는데 실패했습니다.');
            }
        }
    };
    
    console.log(messages);
    return (
        <Card sx={{ width: 1200, padding: 12, margin: 5, height: 450, marginTop: '40px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <form style={{ display: 'flex', flexDirection: 'column', padding: '1rem' }} onSubmit={handleSendMessage}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                <span style={{ marginRight: '1rem', fontWeight: 'bold' }}>받는 사람:</span>
                <TextField
                  name="receiverId"
                  variant="outlined"
                  placeholder="ID 입력"
                  value={receiverId}
                  onChange={handleReceiverIdChange}
                />
                <Button variant="contained" color="primary" onClick={handleCheck} style={{ marginLeft: '1rem' }}>
                  확인
                </Button>
              </div>
      
              {checked && (
                <>
                  <TextField
                    name="messageTitle"
                    variant="outlined"
                    placeholder="제목 입력"
                    value={newMessageData.messageTitle}
                    onChange={handleInputChange}
                    style={{ marginBottom: '1rem' }}
                  />
      
                  <TextField
                    name="messageContents"
                    variant="outlined"
                    placeholder="메세지 내용 입력"
                    value={newMessageData.messageContents}
                    onChange={handleInputChange}
                    multiline
                    rows={5}
                    style={{ marginBottom: '1rem' }}
                  />
      
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button variant="contained" color="primary" type="submit">
                      전송
                    </Button>
                  </div>
                </>
              )}
            </form>
          </div>
        </Card>
      );
      
};

export default SendMessage;