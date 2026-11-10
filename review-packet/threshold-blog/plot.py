from pathlib import Path
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import numpy as np
root=Path(__file__).resolve().parent
plt.rcParams.update({'font.family':'DejaVu Sans','font.size':13,'text.color':'#e0e0e0','axes.labelcolor':'#e0e0e0','xtick.color':'#e0e0e0','ytick.color':'#e0e0e0','axes.edgecolor':'#b5b5b5','svg.fonttype':'none'})
fig,ax=plt.subplots(figsize=(10,6.5),layout='constrained',facecolor='#050505');ax.set_facecolor('#141414')
x=np.linspace(0,2.25,300);ax.plot(x,x*x,color='#d4a853',lw=3,label='f(x) = x²')
ax.scatter([1,2],[1,4],color='#e0e0e0',s=65,zorder=4)
ax.plot([1,2],[1,1],ls='--',color='#b5b5b5');ax.plot([2,2],[1,4],ls='--',color='#b5b5b5')
ax.annotate('Δx = 1',(1.5,1),xytext=(0,-24),textcoords='offset points',ha='center')
ax.annotate('Δy = 3',(2,2.5),xytext=(15,0),textcoords='offset points',va='center')
ax.annotate('(1, 1)',(1,1),xytext=(-55,15),textcoords='offset points');ax.annotate('(2, 4)',(2,4),xytext=(-66,12),textcoords='offset points')
ax.set(xlim=(0,2.4),ylim=(0,5.3),xlabel='Input x',ylabel='Output f(x)',title='A nonlinear response: f(x) = x²')
ax.set_xticks([0,1,2]);ax.set_yticks([0,1,2,3,4,5]);ax.grid(alpha=.16)
ax.text(.1,4.8,'f(1 + 1) = 4\nf(1) + f(1) = 2\nf′(x) = 2x',va='top',linespacing=1.7,color='#e0e0e0')
fig.supxlabel('Ordinary addition still gives 1 + 1 = 2. Squaring is a nonlinear operation.',fontsize=11)
fig.savefig(root/'threshold-nonlinearity.png',dpi=180)
fig.savefig(root/'threshold-nonlinearity.svg')
