import React,{ useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import BeforeHeader from "../../../components/common/BeforeHeader"; 
import Budget from "../../../components/Community/FollowFinance/Budget";
import Finance from "../../../components/Community/FollowFinance/FinanceCard";
import BottomBar from "../../../components/common/BottomBar";
import { Container, CheerupMessage, Line, FirstMessage, SecondMessage } from "../../../styles/Community/FollowFinance/style";
import { useAuth } from "../../../contexts/AuthContext";
import { getFollowFinance } from "../../../api/apiFollow";
import defaultImage from "../../../assets/icons/common/Community/followfinance.svg";

const FollowFinance = () => {
  const { name, followingId } = useParams(); 
  const { formData } = useAuth();
  const accessToken = formData.token;
  
  const [expenseRate, setExpenseRate] = useState(null);
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    if (!followingId || followingId === "undefined") {
      console.error("올바르지 않은 followingId:", followingId);
      return;
    }

    const fetchFinanceData = async () => {
      try {
        if (accessToken) {
          const data = await getFollowFinance(accessToken, followingId);
          if (data) {
            setExpenseRate(data.expenseRate);
            setAccounts(data.accounts);
          }
        } else {
          console.error("토큰이 없습니다.");
        }
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchFinanceData();
  }, [accessToken, followingId]);

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
