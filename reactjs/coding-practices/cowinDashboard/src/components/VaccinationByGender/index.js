import {PieChart, Pie, Legend, Cell, ResponsiveContainer} from 'recharts'

import './index.css'

const VaccinationByGender = props => {
  const {vaccinationByGender} = props
  // console.log(vaccinationByGender)

  return (
    <div className="bg-gender-cont">
      <h1 className="vaccination-by-gender-heading">Vaccination by gender</h1>
      <div className="pie-chart-cont">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              cx="50%"
              cy="60%"
              startAngle={0}
              endAngle={180}
              data={vaccinationByGender}
              dataKey="count"
              innerRadius={30}
              outerRadius={60}
            >
              <Cell name="Male" fill="#f54394" />
              <Cell name="Female" fill="#5a8dee" />
              <Cell name="Others" fill="#2cc6c6" />
            </Pie>

            <Legend
              iconType="circle"
              layout="horizontal"
              verticalAlign="bottom"
              align="center"
              wrapperStyle={{fontSize: 12, fontFamily: 'Roboto'}}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default VaccinationByGender
