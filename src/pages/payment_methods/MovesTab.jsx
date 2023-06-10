import React, { useEffect, useState } from "react";
import { Tab, Tabs, Table } from "react-bootstrap";
import { useRecoilValue } from "recoil";
import { api } from "../../api/axios";
import {
  selectedPaymentMethodState,
  selectedMonthYearState,
} from "../../atoms/paymentMethodsAtoms";

const MovesTab = () => {
  const selectedPaymentMethod = useRecoilValue(selectedPaymentMethodState);
  const selectedMonthYear = useRecoilValue(selectedMonthYearState);
  const [tabs, setTabs] = useState([]);
  const [selectedTab, setSelectedTab] = useState(null);
  const [moves, setMoves] = useState([]);

  useEffect(() => {
    fetchTabs();
  }, [selectedPaymentMethod]);

  useEffect(() => {
    if (selectedTab) {
      fetchMoves(selectedTab);
    }
  }, [selectedTab]);

  const fetchTabs = async () => {
    try {
      const response = await api.get(
        `/moves/month-options/payment_method/${selectedPaymentMethod}`
      );
      setTabs(response.data);
      setSelectedTab(response.data[0]);
    } catch (error) {
      console.log("Error fetching tabs:", error);
    }
  };

  const fetchMoves = async (tab) => {
    try {
      const response = await api.get(
        `/moves/month/${tab}/payment_method/${selectedPaymentMethod}`
      );
      setMoves(response.data);
    } catch (error) {
      console.log("Error fetching moves:", error);
    }
  };

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <div>
      <Tabs activeKey={selectedTab} onSelect={handleTabClick}>
        {tabs.map((tab) => (
          <Tab key={tab} eventKey={tab} title={tab}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Transaction</th>
                  <th>Amount</th>
                  {/* Add more table headers here */}
                </tr>
              </thead>
              <tbody>
                {moves.map((move) => (
                  <tr key={move._id}>
                    <td>{move.transaction}</td>
                    <td>{move.amount}</td>
                    {/* Add more table cells here */}
                  </tr>
                ))}
              </tbody>
            </Table>
          </Tab>
        ))}
      </Tabs>
    </div>
  );
};

export default MovesTab;
