import {XAxis, YAxis, BarChart, Bar, Legend} from 'recharts'
import './index.css'

const VaccinationCoverage = props => {
  const dataFormatter = number => {
    if (number > 1000) {
      return `${(number / 1000).toString()}k`
    }
    return number.toString()
  }
  const {vaccinationCoverageDetails} = props
  // console.log(vaccinationCoverageDetails)
  return (
    <div className="vaccinationCoverage-cont">
      <h1 className="title">Vaccination Coverage</h1>
      <div>
        <BarChart
          width={1000}
          height={300}
          data={vaccinationCoverageDetails}
          margin={{
            top: 5,
          }}
        >
          <XAxis
            dataKey="vaccineDate"
            tick={{
              stroke: '#6C757d',
              strokeWidth: 1,
            }}
          />

          <YAxis
            tickFormatter={dataFormatter}
            tick={{
              stroke: '#6C757d',
              strokeWidth: 0.5,
            }}
          />

          <Legend wrapperStyle={{padding: 30, textAlign: 'center'}} />
          <Bar
            dataKey="dose1"
            name="dose 1"
            fill="#5a8dee"
            radius={[10, 10, 0, 0]}
            barSize="20%"
          />

          <Bar
            dataKey="dose2"
            name="dose 2"
            fill="#f54394"
            radius={[10, 10, 0, 0]}
            barSize="20%"
          />
        </BarChart>
      </div>
    </div>
  )
}

export default VaccinationCoverage
