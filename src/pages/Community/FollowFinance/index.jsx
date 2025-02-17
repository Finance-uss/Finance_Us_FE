import React,{ useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import BeforeHeader from "../../../components/common/BeforeHeader"; 
import Budget from "../../../components/Community/FollowFinance/Budget";
import Finance from "../../../components/Community/FollowFinance/FinanceCard";
import BottomBar from "../../../components/common/BottomBar";
import { Container, CheerupMessage, Line, FirstMessage, SecondMessage } from "../../../styles/Community/FollowFinance/style";
import { getFollowFinance } from "../../../api/followAPI";
import defaultImage from "../../../assets/icons/common/Community/followfinance.svg";

const FollowFinance = () => {
  const { name, followingId } = useParams(); 
  const [expenseRate, setExpenseRate] = useState(null);
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    if (!followingId || followingId === "undefined") {
      console.error("올바르지 않은 followingId:", followingId);
      return;
    }

    const fetchFinanceData = async () => {
      try {
          const data = await getFollowFinance(followingId);
          if (data) {
            setExpenseRate(data.expenseRate);
            setAccounts(data.accounts);
          }
        
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchFinanceData();
  }, [followingId]);

  return (
    <Container>
      <BeforeHeader text={name}/>
      {expenseRate !== null && !isNaN(Number(expenseRate)) ? (
        <Budget name={name} percentage={expenseRate} />
      ) : (
        <CheerupMessage>
          <FirstMessage>목표 금액이 설정되지 않았어요.</FirstMessage> 
          <SecondMessage>함께 응원하며 기다려볼까요?</SecondMessage>
        </CheerupMessage>
      )}
      <Line />
      {accounts.map((account) => (
        <Finance
          key={account.accountId}
          accountId={account.accountId}
          title={account.title}
          image={account.imageUrl||defaultImage}
          preview={account.subName}
          like={account.totalLike}
          thumbs={account.totalCheer}
          satisfaction={account.score}
        />
      ))}
      
      <BottomBar/>
    </Container>
  );
};

export default FollowFinance;
