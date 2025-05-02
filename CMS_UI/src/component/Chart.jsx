import React from 'react'

const Chart = () => {
  return (
    <>
                {/* <Box sx={{ display: "flex", justifyContent: "center" }}> */}
    
                {/* Dummy Charts */}
                {/* <Grid container spacing={3} pt={3}>
              <Grid size={6} p={3}>
              <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
                <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      dataKey="value"
                      nameKey="name"
                      outerRadius={100}
                      fill="#8884d8"
                      label
                    >
                      {pieData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
                </CardContent>
                </Card>
              </Grid>
              
    
              <Grid size={6} p={3}>
                <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
                <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={barData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="pv" fill="#01b5ea" />
                    <Bar dataKey="uv" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
                </CardContent>
                </Card>
              </Grid>
    
              <Grid size={6} p={3}>
                <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
                <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={lineData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                    <Line type="monotone" dataKey="pv" stroke="#82ca9d" />
                  </LineChart>
                </ResponsiveContainer>
                </CardContent>
                </Card>
              </Grid>
    
              <Grid size={6} p={3}>
              <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={columnData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#6559de" />
                  </BarChart>
                </ResponsiveContainer>
                </CardContent>
                </Card>
              </Grid>
            </Grid> */}
                {/* </Box> */}
    </>
  )
}

export default Chart